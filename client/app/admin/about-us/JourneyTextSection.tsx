"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface History {
  id: string;
  title: string;
  subtitle: string;
  upText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function JourneyTextSectionPage() {
  const [data, setData] = useState<History | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  // editable fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [upText, setUpText] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsJourneyTextSection`);
        if (!res.ok) throw new Error("Failed to fetch");

        const result: History = await res.json();
        setData(result);

        // set form values
        setTitle(result.title);
        setSubtitle(result.subtitle);
        setUpText(result.upText);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  /* ---------------- UPDATE DATA ---------------- */
  const handleUpdate = async () => {
    if (!data) return;
    setSaving(true);

    try {
      const res = await fetch(
        `${config.base_url}/aboutUsJourneyTextSection`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, subtitle, upText }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated: History = await res.json();
      setData(updated);
      window.location.reload()
      toast.success("Updated successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card className="relative">
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{data.upText}</p>
            <CardTitle className="text-2xl font-bold">
              {data.title}
            </CardTitle>
          </div>

          {/* EDIT BUTTON */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="flex gap-1">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 space-y-3">
              <Input
                placeholder="Up Text"
                value={upText}
                onChange={(e) => setUpText(e.target.value)}
              />
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="min-h-[100px]"
              />

              <Button
                className="w-full flex gap-2"
                onClick={handleUpdate}
                disabled={saving}
              >
                <Check className="w-4 h-4" />
                {saving ? "Updating..." : "Update"}
              </Button>
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">{data.subtitle}</p>
        </CardContent>
      </Card>
    </div>
  );
}
