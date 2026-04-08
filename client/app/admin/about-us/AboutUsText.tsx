"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check } from "lucide-react";
import { toast } from "sonner"; // ShadCN toast
import config from "@/app/config";

interface AboutUsText {
  id: string;
  page: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsTextCard({ data }: { data: AboutUsText }) {
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // control popover

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${config.base_url}/about-us-text`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, isActive: data.isActive }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Updated successfully!");
      setOpen(false); // close popover
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-lg font-medium">{subtitle}</p>

        <div className="flex justify-end mt-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <Textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtitle"
                className="min-h-[100px]"
              />
              <Button
                className="w-full flex items-center justify-center gap-2"
                onClick={handleUpdate}
                disabled={loading}
              >
                <Check className="w-4 h-4" />
                {loading ? "Updating..." : "Update"}
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
