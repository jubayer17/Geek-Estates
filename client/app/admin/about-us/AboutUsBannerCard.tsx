"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Check, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface Banner {
  id: string;
  url: string;
  altText: string;
  type: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsBannerCard({
  banner,
  onUpdate,
  onDelete,
}: {
  banner: Banner;
  onUpdate: (updated: Banner) => void;
  onDelete: (id: string) => void;
}) {
  const [url, setUrl] = useState(banner.url);
  const [altText, setAltText] = useState(banner.altText);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleUpdate() {
    if (!file && !altText) return toast.error("Nothing to update");

    setLoading(true);
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("data", JSON.stringify({ altText }));

      const res = await fetch(`${config.base_url}/about-us-banner-image/${banner.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      onUpdate(updated);
      toast.success("Banner updated successfully!");
      setFile(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update banner");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      const res = await fetch(`${config.base_url}/about-us-banners/${banner.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      onDelete(banner.id);
      toast.success("Banner deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete banner");
    }
  }

  return (
    <Card className="relative">
      <img src={url} alt={altText} className="rounded-t-md object-cover w-full h-48" />
      <CardContent className="space-y-2">
        <p className="text-sm font-medium">Alt Text: {altText}</p>

        <div className="flex justify-end space-x-2 mt-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="flex items-center space-x-1">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-3">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Alt Text" />
              <Button className="w-full flex items-center justify-center space-x-2" onClick={handleUpdate} disabled={loading}>
                <Check className="w-4 h-4" />
                <span>{loading ? "Updating..." : "Update"}</span>
              </Button>
            </PopoverContent>
          </Popover>

          <Button size="sm" variant="destructive" onClick={handleDelete} className="flex items-center space-x-1">
            <Trash className="w-4 h-4" />
            <span>Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
