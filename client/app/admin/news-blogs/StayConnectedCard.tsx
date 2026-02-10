"use client"; // ✅ client

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check } from "lucide-react";
import { toast } from "sonner";
import config from "@/app/config";

interface StayConnected {
  id: string;
  heading: string;
  subheading: string;
  description: string;
  isActive: boolean;
  section: string;
}

export default function StayConnectedCard({ data }: { data: StayConnected }) {
  const [heading, setHeading] = useState(data.heading);
  const [subheading, setSubheading] = useState(data.subheading);
  const [description, setDescription] = useState(data.description);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      const res = await fetch(`${config.base_url}/newsletter-section`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading, subheading, description }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Updated successfully!");
      setOpen(false);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-xl mx-auto relative">
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{subheading}</p>
        <p>{description}</p>

        <div className="flex justify-end mt-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 space-y-3">
              <Input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Heading" />
              <Input value={subheading} onChange={(e) => setSubheading(e.target.value)} placeholder="Subheading" />
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="min-h-[100px]" />
              <Button onClick={handleUpdate} disabled={loading} className="w-full flex items-center justify-center space-x-2">
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
