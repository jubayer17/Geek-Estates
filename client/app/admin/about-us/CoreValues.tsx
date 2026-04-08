"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface CoreValue {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CoreValuesPage() {
  const [values, setValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit states
  const [selectedValue, setSelectedValue] = useState<CoreValue | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editOpenId, setEditOpenId] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchValues();
  }, []);

  async function fetchValues() {
    try {
      const res = await fetch(`${config.base_url}/aboutUsCoreValue`); // replace with your endpoint
      if (!res.ok) throw new Error("Failed to fetch core values");
      const data: CoreValue[] = await res.json();
      setValues(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch core values");
    }
  }

  // Open edit popover
  const openEdit = (value: CoreValue) => {
    setSelectedValue(value);
    setEditTitle(value.title);
    setEditDescription(value.description);
    setEditOpenId(value.id);
  };

  // Update core value
  const handleUpdate = async () => {
    if (!selectedValue) return;
    setLoading(true);
    try {
      const body = { title: editTitle, description: editDescription };
      const res = await fetch(`${config.base_url}/aboutUsCoreValue/${selectedValue.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");

      const updated: CoreValue = await res.json();
      setValues(values.map((v) => (v.id === updated.id ? updated : v)));
      toast.success("Updated successfully!");
      window.location.reload()
      setEditOpenId(null);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {values.map((value) => (
        <Card key={value.id}>
          <CardHeader className="flex justify-between items-start">
            <CardTitle>{value.title}</CardTitle>

            {/* Edit Popover */}
            <Popover
              open={editOpenId === value.id}
              onOpenChange={(open) => setEditOpenId(open ? value.id : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center space-x-1"
                  onClick={() => openEdit(value)}
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 space-y-2">
                <Input
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
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
            <p className="text-muted-foreground">{value.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
