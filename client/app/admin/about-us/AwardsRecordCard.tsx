"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface Award {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AwardsRecordCard({ initialData }: { initialData: Award[] }) {
  const [awards, setAwards] = useState<Award[]>(initialData);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  // Open edit popover
  const openEdit = (award: Award) => {
    setSelectedAward(award);
    setYear(award.year);
    setTitle(award.title);
    setSubtitle(award.subtitle);
    setEditOpen(true);
  };

  // Update award
  const handleUpdate = async () => {
    if (!selectedAward) return;
    setLoading(true);
    try {
      const body = { year, title, subtitle };
      const res = await fetch(`${config.base_url}/aboutUsAwardRecords/${selectedAward.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated: Award = await res.json();
      setAwards(awards.map(a => (a.id === updated.id ? updated : a)));
      toast.success("Award updated!");
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete award
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this award?")) return;
    try {
      const res = await fetch(`${config.base_url}/aboutUsAwardRecords/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setAwards(awards.filter(a => a.id !== id));
      toast.success("Deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Add new award
  const handleAdd = async () => {
    setLoading(true);
    try {
      const body = { year, title, subtitle };
      const res = await fetch(`${config.base_url}/aboutUsAwardRecords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Add failed");
      const newAward: Award = await res.json();
      setAwards([newAward, ...awards]);
      toast.success("Added successfully!");
      setAddOpen(false);
      setYear("");
      setTitle("");
      setSubtitle("");
    } catch (err) {
      console.error(err);
      toast.error("Add failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto mt-6">
      {/* Add Button */}
      <div className="flex justify-end">
        <Popover open={addOpen} onOpenChange={setAddOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" className="flex border-2 items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Award</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-2">
            <Input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} />
            <Button className="w-full flex items-center justify-center space-x-2" onClick={handleAdd} disabled={loading}>
              <Check className="w-4 h-4" />
              <span>{loading ? "Adding..." : "Add"}</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Awards Cards */}
      {awards.map(award => (
        <Card key={award.id} className="relative">
          <CardHeader className="flex justify-between items-start">
            <CardTitle>{award.year} - {award.title}</CardTitle>
            <div className="flex space-x-2">
              <Popover open={editOpen && selectedAward?.id === award.id} onOpenChange={setEditOpen}>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="flex items-center space-x-1" onClick={() => openEdit(award)}>
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 space-y-2">
                  <Input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" />
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
                  <Textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Subtitle" />
                  <Button className="w-full flex items-center justify-center space-x-2" onClick={handleUpdate} disabled={loading}>
                    <Check className="w-4 h-4" />
                    <span>{loading ? "Updating..." : "Update"}</span>
                  </Button>
                </PopoverContent>
              </Popover>

              <Button size="sm" variant="destructive" className="flex items-center space-x-1" onClick={() => handleDelete(award.id)}>
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{award.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
