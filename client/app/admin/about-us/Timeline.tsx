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

interface Timeline {
  id: string;
  startYear: string;
  endYear: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AboutUsTimelinePage() {
  const [items, setItems] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);

  const [openId, setOpenId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // editable fields
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsJourneyTimeline`);
        if (!res.ok) throw new Error("Fetch failed");
        const data: Timeline[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load timeline");
      } finally {
        setLoading(false);
      }
    }

    fetchTimeline();
  }, []);

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (item: Timeline) => {
    setOpenId(item.id);
    setStartYear(item.startYear);
    setEndYear(item.endYear);
    setTitle(item.title);
    setDescription(item.description);
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(
        `${config.base_url}/aboutUsJourneyTimeline/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startYear,
            endYear,
            title,
            description,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated: Timeline = await res.json();

      setItems((prev) =>
        prev.map((i) => (i.id === id ? updated : i))
      );

      toast.success("Updated successfully");
      setOpenId(null);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="relative">
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">
                {item.startYear} – {item.endYear}
              </p>
              <CardTitle className="text-xl">
                {item.title}
              </CardTitle>
            </div>

            {/* EDIT */}
            <Popover
              open={openId === item.id}
              onOpenChange={(open) =>
                setOpenId(open ? item.id : null)
              }
            >
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(item)}
                  className="flex gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 space-y-3">
                <Input
                  placeholder="Start Year"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
                <Input
                  placeholder="End Year"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                />
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />

                <Button
                  className="w-full flex gap-2"
                  onClick={() => handleUpdate(item.id)}
                  disabled={saving}
                >
                  <Check className="w-4 h-4" />
                  {saving ? "Updating..." : "Update"}
                </Button>
              </PopoverContent>
            </Popover>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
