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
import { Edit, Trash, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface LeaderQuote {
  id: string;
  imageUrl: string;
  quote: string;
  name: string;
  designation: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function LeadershipQuotesPage() {
  const [items, setItems] = useState<LeaderQuote[]>([]);
  const [loading, setLoading] = useState(true);

  const [openEditId, setOpenEditId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsLeadership`);
        if (!res.ok) throw new Error();
        setItems(await res.json());
      } catch {
        toast.error("Failed to load leadership quotes");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (item: LeaderQuote) => {
    setOpenEditId(item.id);
    setQuote(item.quote);
    setName(item.name);
    setDesignation(item.designation);
    setImageFile(null);
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const body = new FormData();
      if (imageFile) body.append("image", imageFile);

      body.append(
        "data",
        JSON.stringify({ quote, name, designation })
      );

      const res = await fetch(
        `${config.base_url}/aboutUsLeadership/${id}`,
        {
          method: "PUT",
          body,
        }
      );

      if (!res.ok) throw new Error();
      const updated = await res.json();

      setItems((prev) =>
        prev.map((i) => (i.id === id ? updated : i))
      );

      toast.success("Updated successfully");
      setOpenEditId(null);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quote?")) return;
    try {
      const res = await fetch(
        `${config.base_url}/aboutUsLeadership/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();

      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- ADD ---------------- */
  const handleAdd = async () => {
    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    setSaving(true);
    try {
      const body = new FormData();
      body.append("image", imageFile);
      body.append(
        "data",
        JSON.stringify({ quote, name, designation })
      );

      const res = await fetch(
        `${config.base_url}/aboutUsLeadership`,
        {
          method: "POST",
          body,
        }
      );

      if (!res.ok) throw new Error();
      const created = await res.json();

      setItems((prev) => [created, ...prev]);
      toast.success("Added successfully");

      setAddOpen(false);
      setImageFile(null);
      setQuote("");
      setName("");
      setDesignation("");
    } catch {
      toast.error("Add failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <Popover open={addOpen} onOpenChange={setAddOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" className="border-2">
              <Plus className="w-4 h-4 mr-1" />
              Add Quote
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-3">
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            <Textarea placeholder="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} />
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            <Button className="w-full" onClick={handleAdd} disabled={saving}>
              <Check className="w-4 h-4 mr-1" />
              {saving ? "Adding..." : "Add"}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* CARDS */}
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row justify-between">
            <div className="flex gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div>
                <CardTitle>{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.designation}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {/* EDIT */}
              <Popover
                open={openEditId === item.id}
                onOpenChange={(o) => setOpenEditId(o ? item.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 space-y-3">
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} />
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                  <Input value={designation} onChange={(e) => setDesignation(e.target.value)} />
                  <Button className="w-full" onClick={() => handleUpdate(item.id)} disabled={saving}>
                    <Check className="w-4 h-4 mr-1" />
                    {saving ? "Updating..." : "Update"}
                  </Button>
                </PopoverContent>
              </Popover>

              {/* DELETE */}
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <p className="italic text-muted-foreground">“{item.quote}”</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
