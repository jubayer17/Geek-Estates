"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import config from "@/app/config";
import AboutUsBannerCard from "./AboutUsBannerCard";

interface Banner {
  id: string;
  url: string;
  altText: string;
  type: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // Add banner popover state
  const [addPopoverOpen, setAddPopoverOpen] = useState(false);
  const [newAltText, setNewAltText] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${config.base_url}/about-us-banner-image`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch banners");
        const data = await res.json();
        setBanners(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load banners");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Add new banner
  async function handleAddBanner() {
    if (!newFile) return toast.error("Please select an image file");

    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("data", JSON.stringify({ altText: newAltText }));

      const res = await fetch(`${config.base_url}/about-us-banner-image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add banner");
      const created = await res.json();
      setBanners((prev) => [created, ...prev]);
      toast.success("Banner added successfully!");
      setNewFile(null);
      setNewAltText("");
      setAddPopoverOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add banner");
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading banners...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E7C873]">About Us Banners</h1>

        <Popover open={addPopoverOpen} onOpenChange={setAddPopoverOpen}>
          <PopoverTrigger asChild>
            <Button className="border-2 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Banner</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-96 space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewFile(e.target.files?.[0] || null)}
            />
            <Input
              value={newAltText}
              onChange={(e) => setNewAltText(e.target.value)}
              placeholder="Alt Text"
            />
            <Button className="w-full" onClick={handleAddBanner} disabled={adding}>
              {adding ? "Adding..." : "Add Banner"}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <AboutUsBannerCard
            key={banner.id}
            banner={banner}
            onUpdate={(updated) =>
              setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
            }
            onDelete={(deletedId) =>
              setBanners((prev) => prev.filter((b) => b.id !== deletedId))
            }
          />
        ))}
      </div>
    </div>
  );
}
