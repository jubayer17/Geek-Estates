"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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
import { Banner } from "./home.type"
import { toast } from "sonner"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  banner: Banner
  onUpdate: (id: string, data: FormData) => Promise<void>
}

export default function EditHeroBannerDialog({ open, setOpen, banner, onUpdate }: Props) {
  const [form, setForm] = useState({
    badgeText: banner.badgeText,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonText1: banner.buttonText1,
    buttonText2: banner.buttonText2,
  })
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(banner.imageUrl)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return

    setForm({
      badgeText: banner.badgeText,
      title: banner.title,
      subtitle: banner.subtitle,
      buttonText1: banner.buttonText1,
      buttonText2: banner.buttonText2,
    })
    setImage(null)
    setPreview(banner.imageUrl)
  }, [banner, open])

  const handleImageChange = (file: File | null) => {
    setImage(file)
    setPreview(file ? URL.createObjectURL(file) : banner.imageUrl)
  }

  const handleSubmit = async () => {
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        toast.error(`${key} is required`)
        return
      }
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("data", JSON.stringify(form))
      if (image) {
        formData.append("image", image)
      }

      await onUpdate(banner.id, formData)
      setOpen(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update banner")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Hero Banner</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 pt-2">
          <div className="grid gap-2">
            <Label>Badge Text</Label>
            <Input
              value={form.badgeText}
              onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label>Subtitle</Label>
            <Textarea
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Button Text 1</Label>
              <Input
                value={form.buttonText1}
                onChange={(e) => setForm({ ...form, buttonText1: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Button Text 2</Label>
              <Input
                value={form.buttonText2}
                onChange={(e) => setForm({ ...form, buttonText2: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Banner Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
            {preview ? (
              <div className="overflow-hidden rounded-md border">
                <Image
                  src={preview}
                  alt="Banner preview"
                  width={1200}
                  height={600}
                  className="h-56 w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Banner"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
