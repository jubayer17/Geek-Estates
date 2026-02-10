"use client"

import { useState } from "react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { FeaturedImage } from "./home.type"
import { Edit } from "lucide-react"


type Props = {
  data: FeaturedImage
  onUpdate: (id: string, formData: FormData) => Promise<void>
}

export default function FeaturedImageCard({ data, onUpdate }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    order: data.order,
    label: data.label,
    title: data.title,
    description: data.description,
    isActive: data.isActive,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()

      if (imageFile) formData.append("image", imageFile)
      if (iconFile) formData.append("icon", iconFile)

      formData.append("data", JSON.stringify(form))

      await onUpdate(data.id, formData)
      toast.success("Updated successfully")
      setOpen(false)
    } catch (error) {
      toast.error("Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-lg shadow p-4 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{data.title}</h3>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button  size="sm">
              <Edit/>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-96 space-y-4">
            <div>
              <Label>Order</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              />
            </div>

            <div>
              <Label>Label</Label>
              <Input
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div>
              <Label>Active</Label>
              <select
                value={form.isActive ? "true" : "false"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.value === "true" }))
                }
                className="w-full border rounded p-2"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div>
              <Label>Image (Current shown below)</Label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              <Image
                src={imageFile ? URL.createObjectURL(imageFile) : data.imageUrl}
                alt="Image preview"
                width={200}
                height={120}
                className="mt-2 object-contain rounded"
              />
            </div>

            <div>
              <Label>Icon (Current shown below)</Label>
              <input type="file" accept="image/*" onChange={(e) => setIconFile(e.target.files?.[0] || null)} />
              <Image
                src={iconFile ? URL.createObjectURL(iconFile) : data.iconUrl}
                alt="Icon preview"
                width={80}
                height={80}
                className="mt-2 object-contain rounded"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <p className="mt-2 text-gray-600">{data.description}</p>
      <div className="mt-4 flex gap-4">
        <Image src={data.imageUrl} alt={data.title} width={200} height={120} className="rounded" />
        <Image src={data.iconUrl} alt={data.title + " icon"} width={80} height={80} className="rounded" />
      </div>
    </div>
  )
}
