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
import { Edit, Trash, Plus, Check, Star } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface Testimonial {
  id: string;
  message: string;
  company: string;
  rating: number;
  name: string;
  designation: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [openEditId, setOpenEditId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${config.base_url}/aboutUsTestimonial`);
        if (!res.ok) throw new Error();
        setItems(await res.json());
      } catch {
        toast.error("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ---------------- OPEN EDIT ---------------- */
  const openEdit = (item: Testimonial) => {
    setOpenEditId(item.id);
    setMessage(item.message);
    setCompany(item.company);
    setRating(item.rating);
    setName(item.name);
    setDesignation(item.designation);
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`${config.base_url}/aboutUsTestimonial/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          company,
          rating,
          name,
          designation,
        }),
      });

      if (!res.ok) throw new Error();
      const updated = await res.json();

      setItems((prev) =>
        prev.map((i) => (i.id === id ? updated : i))
      );

      toast.success("Testimonial updated");
      setOpenEditId(null);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`${config.base_url}/aboutUsTestimonial/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- ADD ---------------- */
  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${config.base_url}/aboutUsTestimonial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          company,
          rating,
          name,
          designation,
        }),
      });

      if (!res.ok) throw new Error();
      const created = await res.json();

      setItems((prev) => [created, ...prev]);
      toast.success("Testimonial added");

      setAddOpen(false);
      setMessage("");
      setCompany("");
      setRating(5);
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
              Add Testimonial
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-3">
            <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(+e.target.value)} />
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
            <div>
              <CardTitle>{item.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {item.designation} • {item.company}
              </p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
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
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                  <Input value={designation} onChange={(e) => setDesignation(e.target.value)} />
                  <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(+e.target.value)} />
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
            <p className="italic text-muted-foreground">“{item.message}”</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
