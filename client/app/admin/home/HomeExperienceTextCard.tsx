"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { ExperienceText } from "./home.type"
import { Edit2 } from "lucide-react"

type Props = {
  data: ExperienceText
  onUpdate: (id: string, updatedData: Partial<ExperienceText>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function HomeExperienceTextCard({ data, onUpdate, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    number: data.number,
    suffix: data.suffix,
    title: data.title,
    description: data.description,
    order: data.order,
    isActive: data.isActive,
  })
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)
    try {
      await onUpdate(data.id, form)
      toast.success("Updated successfully")
      setOpen(false)
    } catch {
      toast.error("Update failed")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this experience text?")) return
    try {
      await onDelete(data.id)
      toast.success("Deleted successfully")
    } catch {
      toast.error("Delete failed")
    }
  }

  return (
    <div className="relative border rounded-md p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{data.title}</h3>
        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="sm">
                <Edit2/>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 space-y-4">
              <div>
                <Label>Number</Label>
                <Input
                  type="number"
                  value={form.number}
                  onChange={(e) => setForm((f) => ({ ...f, number: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label>Suffix</Label>
                <Input
                  value={form.suffix}
                  onChange={(e) => setForm((f) => ({ ...f, suffix: e.target.value }))}
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
                <Label>Order</Label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label>Active</Label>
                <select
                  className="w-full border rounded p-2"
                  value={form.isActive ? "true" : "false"}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.value === "true" }))}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </div>

      <p className="mt-2 text-gray-700">{data.description}</p>
      <p className="mt-1 text-sm text-gray-500">
        Number: {data.number}
        {data.suffix} | Order: {data.order} | Active: {data.isActive ? "Yes" : "No"}
      </p>
    </div>
  )
}
