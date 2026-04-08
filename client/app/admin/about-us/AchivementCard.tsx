"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface Stat {
  id: string;
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(false);

  // Add/Edit form states
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Popover state
  const [editOpenId, setEditOpenId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch(`${config.base_url}/aboutUsAchievements`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data: Stat[] = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch stats");
    }
  }

  // Open edit popover
  const openEdit = (stat: Stat) => {
    setSelectedStat(stat);
    setNumber(stat.number);
    setTitle(stat.title);
    setDescription(stat.description);
    setEditOpenId(stat.id);
  };

  // Update stat
  const handleUpdate = async () => {
    if (!selectedStat) return;
    setLoading(true);
    try {
      const body = { number, title, description };
      const res = await fetch(`${config.base_url}/aboutUsAchievements/${selectedStat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");

      const updated: Stat = await res.json();
      setStats(stats.map((s) => (s.id === updated.id ? updated : s)));
      toast.success("Stat updated!");
      setEditOpenId(null);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete stat
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;
    try {
      const res = await fetch(`${config.base_url}/aboutUsAchievements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setStats(stats.filter((s) => s.id !== id));
      toast.success("Deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Add new stat
  const handleAdd = async () => {
    setLoading(true);
    try {
      const body = { number, title, description };
      const res = await fetch(`${config.base_url}/aboutUsAchievements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Add failed");
      const newStat: Stat = await res.json();
      setStats([newStat, ...stats]);
      toast.success("Added successfully!");
      setAddOpen(false);
      setNumber("");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error("Add failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Add Button */}
      <div className="flex justify-end">
        <Popover open={addOpen} onOpenChange={setAddOpen}>
          <PopoverTrigger asChild>
            <Button  size="sm" className="flex border-2 items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Stat</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-2">
            <Input placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button className="w-full flex items-center justify-center space-x-2" onClick={handleAdd} disabled={loading}>
              <Check className="w-4 h-4" />
              <span>{loading ? "Adding..." : "Add"}</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Stats Cards */}
      {stats.map((stat) => (
        <Card key={stat.id} className="relative">
          <CardHeader className="flex justify-between items-start">
            <CardTitle>{stat.title}</CardTitle>
            <div className="flex space-x-2">
              {/* Edit Popover */}
              <Popover
                open={editOpenId === stat.id}
                onOpenChange={(open) => setEditOpenId(open ? stat.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-1"
                    onClick={() => openEdit(stat)}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 space-y-2">
                  <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Number" />
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                  <Button className="w-full flex items-center justify-center space-x-2" onClick={handleUpdate} disabled={loading}>
                    <Check className="w-4 h-4" />
                    <span>{loading ? "Updating..." : "Update"}</span>
                  </Button>
                </PopoverContent>
              </Popover>

              {/* Delete Button */}
              <Button size="sm" variant="destructive" className="flex items-center space-x-1" onClick={() => handleDelete(stat.id)}>
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{stat.number}</p>
            <p className="text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
