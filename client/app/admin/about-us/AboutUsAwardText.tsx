"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface Feature {
  id: string;
  title: string;
  extraTitle: string;
  subtitle: string;
  upText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsAwardText({ initialData }: { initialData: Feature }) {
  const [feature, setFeature] = useState<Feature>(initialData);
  const [loading, setLoading] = useState(false);

  // Popover control
  const [editOpen, setEditOpen] = useState(false);

  // Editable fields
  const [title, setTitle] = useState(feature.title);
  const [extraTitle, setExtraTitle] = useState(feature.extraTitle);
  const [subtitle, setSubtitle] = useState(feature.subtitle);
  const [upText, setUpText] = useState(feature.upText);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const body = { title, extraTitle, subtitle, upText };
      const res = await fetch(`${config.base_url}/aboutUsAwardTextSection`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");

      const updated: Feature = await res.json();
      setFeature(updated);
      toast.success("Feature updated!");
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto relative">
      <CardHeader className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{feature.upText}</p>
          <CardTitle className="text-2xl">
            {feature.title} <span className="italic">{feature.extraTitle}</span>
          </CardTitle>
        </div>

        {/* Edit Popover */}
        <Popover open={editOpen} onOpenChange={setEditOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="flex items-center space-x-1">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-2">
            <Input placeholder="Up Text" value={upText} onChange={(e) => setUpText(e.target.value)} />
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Extra Title" value={extraTitle} onChange={(e) => setExtraTitle(e.target.value)} />
            <Textarea
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              className="w-full flex items-center justify-center space-x-2"
              onClick={handleUpdate}
              disabled={loading}
            >
              <Check className="w-4 h-4" />
              <span>{loading ? "Updating..." : "Update"}</span>
            </Button>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{feature.subtitle}</p>
      </CardContent>
    </Card>
  );
}
