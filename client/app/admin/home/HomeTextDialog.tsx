"use client"

import { useState, useEffect } from "react"
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
import { toast } from "sonner"
import { HomeText } from "./home.type"


type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  data: HomeText
  onUpdate: (id: string, updatedData: any) => Promise<void>
}

export default function EditHomeTextDialog({ open, setOpen, data, onUpdate }: Props) {
  const [form, setForm] = useState({
    journeyTag: "",
    title: "",
    emphasis: "",
    description: "",
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setForm({
      journeyTag: data.journeyTag,
      title: data.title,
      emphasis: data.emphasis,
      description: data.description,
      isActive: data.isActive,
    })
  }, [data])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.journeyTag.trim()) newErrors.journeyTag = "Journey Tag is required"
    if (!form.title.trim()) newErrors.title = "Title is required"
    if (!form.emphasis.trim()) newErrors.emphasis = "Emphasis is required"
    if (!form.description.trim()) newErrors.description = "Description is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)
    try {
      await onUpdate(data.id, form)
      toast.success("Home text updated successfully!")
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

        <div className="space-y-4 mt-2">
          <div className="flex flex-col">
            <Label>Journey Tag</Label>
            <Input
              value={form.journeyTag}
              onChange={(e) => setForm({ ...form, journeyTag: e.target.value })}
            />
            {errors.journeyTag && <span className="text-red-500 text-sm">{errors.journeyTag}</span>}
          </div>

          <div className="flex flex-col">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
          </div>

          <div className="flex flex-col">
            <Label>Emphasis</Label>
            <Input
              value={form.emphasis}
              onChange={(e) => setForm({ ...form, emphasis: e.target.value })}
            />
            {errors.emphasis && <span className="text-red-500 text-sm">{errors.emphasis}</span>}
          </div>

          <div className="flex flex-col">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
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
