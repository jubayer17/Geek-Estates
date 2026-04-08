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

interface WhoWeAre {
  id: string;
  imageUrl: string;
  yearsOfExcellence: string;
  excellenceText: string;
  smallHeading: string;
  mainHeading: string;
  mainHeadingItalic: string;
  paragraphs: string[];
  ctaText: string;
  ctaUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function WhoWeAreCard({ data }: { data: WhoWeAre }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(data.imageUrl);
  const [yearsOfExcellence, setYearsOfExcellence] = useState(data.yearsOfExcellence);
  const [excellenceText, setExcellenceText] = useState(data.excellenceText);
  const [smallHeading, setSmallHeading] = useState(data.smallHeading);
  const [mainHeading, setMainHeading] = useState(data.mainHeading);
  const [mainHeadingItalic, setMainHeadingItalic] = useState(data.mainHeadingItalic);
  const [paragraphs, setParagraphs] = useState((data.paragraphs || []).join("\n\n"));
  const [ctaText, setCtaText] = useState(data.ctaText);
  const [ctaUrl, setCtaUrl] = useState(data.ctaUrl || "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleUpdate() {
  setLoading(true);
  try {
    const body = new FormData();

    // Append image file if present
    if (imageFile) body.append("image", imageFile);

    // Prepare JSON payload for other fields
    const jsonData = {
      smallHeading,
      mainHeading,
      mainHeadingItalic,
      yearsOfExcellence,
      excellenceText,
      ctaText,
      ctaUrl,
      paragraphs: paragraphs.split(/\n{2,}/).map(p => p.trim()), // array of paragraphs
    };

    // Append as JSON string
    body.append("data", JSON.stringify(jsonData));

    const res = await fetch(`${config.base_url}/aboutWhoWeAre/${data.id}`, {
      method: "PUT",
      body,
    });

    if (!res.ok) throw new Error("Update failed");

    toast.success("Updated successfully!");
    setOpen(false);
  } catch (err) {
    console.error(err);
    toast.error("Update failed");
  } finally {
    setLoading(false);
  }
}


  return (
    <Card className="max-w-3xl mx-auto relative">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{smallHeading}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <img src={imagePreview} alt={smallHeading} className="rounded-md w-full object-cover max-h-64" />

        <div className="space-y-2">
          <p className="text-xl font-semibold">
            {mainHeading} <span className="italic">{mainHeadingItalic}</span>
          </p>
          <p className="text-muted-foreground">
            {paragraphs.split("\n\n").map((p, i) => (
              <span key={i}>{p}<br /></span>
            ))}
          </p>
          <p className="font-bold">{yearsOfExcellence} - {excellenceText}</p>
          {ctaText && <Button variant="outline">{ctaText}</Button>}
        </div>

        <div className="flex justify-end mt-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
              />
              <Input value={yearsOfExcellence} onChange={(e) => setYearsOfExcellence(e.target.value)} placeholder="Years of Excellence" />
              <Input value={excellenceText} onChange={(e) => setExcellenceText(e.target.value)} placeholder="Excellence Text" />
              <Input value={smallHeading} onChange={(e) => setSmallHeading(e.target.value)} placeholder="Small Heading" />
              <Input value={mainHeading} onChange={(e) => setMainHeading(e.target.value)} placeholder="Main Heading" />
              <Input value={mainHeadingItalic} onChange={(e) => setMainHeadingItalic(e.target.value)} placeholder="Main Heading Italic" />
              <Textarea value={paragraphs} onChange={(e) => setParagraphs(e.target.value)} placeholder="Paragraphs (Separate by empty line)" className="min-h-[120px]" />
              <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="CTA Text" />
              <Input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="CTA URL" />

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
        </div>
      </CardContent>
    </Card>
  );
}
