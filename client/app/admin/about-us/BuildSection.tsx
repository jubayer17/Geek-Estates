"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface CTAData {
  id: string;
  heading: string;
  highlightedText: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BuildPage() {
  const [data, setData] = useState<CTAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // form states
  const [heading, setHeading] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [description, setDescription] = useState("");

  // FETCH DATA
  useEffect(() => {
    async function fetchCTA() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsBuildSection`);
        if (!res.ok) throw new Error();
        const result = await res.json();

        setData(result);
        setHeading(result.heading);
        setHighlightedText(result.highlightedText);
        setDescription(result.description);
      } catch (err) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchCTA();
  }, []);

  // UPDATE
  const handleUpdate = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${config.base_url}/aboutUsBuildSection/${data.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            heading,
            highlightedText,
            description,
          }),
        }
      );

      if (!res.ok) throw new Error();
      const updated = await res.json();

      setData(updated);
      toast.success("Updated successfully");
      window.location.reload()
      setEditOpen(false);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <CardTitle className="text-2xl">
            {data.heading}{" "}
            <span className="text-primary font-bold">
              {data.highlightedText}
            </span>
          </CardTitle>

          {/* EDIT */}
          <Popover open={editOpen} onOpenChange={setEditOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 space-y-3">
              <Input
                placeholder="Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <Input
                placeholder="Highlighted Text"
                value={highlightedText}
                onChange={(e) => setHighlightedText(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />

              <Button
                className="w-full"
                onClick={handleUpdate}
                disabled={saving}
              >
                <Check className="w-4 h-4 mr-1" />
                {saving ? "Updating..." : "Update"}
              </Button>
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
