"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { HomeText } from "./home.type"
import { toast } from "sonner"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  data: HomeText
  onUpdate: (id: string, updatedData: any) => void
}

export default function EditHomeTextDialog({ open, setOpen, data, onUpdate }: Props) {
  const [form, setForm] = useState({
    title: data?.title,
    emphasis: data?.emphasis,
    description: data?.description,
    journeyTag: data?.journeyTag,
    isActive: data?.isActive,
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    // all fields required validation
    for (const key of ["title", "emphasis", "description", "journeyTag"]) {
      if (!form[key as keyof typeof form]) {
        toast.error(`${key} is required`)
        return
      }
    }

    setLoading(true)
    try {
      await onUpdate(data.id, form)
      setOpen(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update home text")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Home Text</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <Label>Emphasis</Label>
            <Input
              value={form.emphasis}
              onChange={(e) => setForm({ ...form, emphasis: e.target.value })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <Label>Journey Tag</Label>
            <Input
              value={form.journeyTag}
              onChange={(e) => setForm({ ...form, journeyTag: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            <Label>Active</Label>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
