"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import config from "@/app/config"

interface PropertyStep {
  id: string
  stepNumber: number
  title: string
  description: string
  imageUrl: string
  statusText: string
  statusIcon: string
  order: number
  isActive: boolean
}

export default function PropertySearchCard() {
  const [steps, setSteps] = useState<PropertyStep[]>([])
  const [loading, setLoading] = useState(false)
  const [editingStep, setEditingStep] = useState<PropertyStep | null>(null)
  const [editForm, setEditForm] = useState<Partial<PropertyStep & { image?: File; icon?: File }>>({})

  // Fetch steps
  const fetchSteps = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${config.base_url}/propertySearch`)
      if (!res.ok) throw new Error("Failed to fetch steps")
      const json = await res.json()
      // json itself is the array
      setSteps(Array.isArray(json) ? json : [])
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch steps")
      setSteps([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSteps()
  }, [])

  // Delete step
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      const res = await fetch(`${config.base_url}/propertySearch/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      setSteps(prev => prev.filter(s => s.id !== id))
      toast.success("Step deleted")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete")
    }
  }

  // Save edit
  const handleEditSave = async () => {
    if (!editingStep) return

    const formData = new FormData()
    if (editForm.image) formData.append("image", editForm.image)
    if (editForm.icon) formData.append("icon", editForm.icon)
    formData.append(
      "data",
      JSON.stringify({
        title: editForm.title ?? editingStep.title,
        description: editForm.description ?? editingStep.description,
        order: editForm.order ?? editingStep.order,
        statusText: editForm.statusText ?? editingStep.statusText,
        isActive: editForm.isActive ?? editingStep.isActive,
      })
    )

    try {
      const res = await fetch(`${config.base_url}/propertySearch/${editingStep.id}`, {
        method: "PUT",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to update step")
      toast.success("Step updated")
      fetchSteps()
      setEditingStep(null)
      setEditForm({})
    } catch (err) {
      console.error(err)
      toast.error("Failed to update step")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {loading ? (
        <p className="col-span-full text-center text-gray-500">Loading...</p>
      ) : Array.isArray(steps) && steps.length > 0 ? (
        steps.map(step => (
          <Card key={step.id} className="relative shadow-lg overflow-hidden">
            {/* Top-right buttons */}
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              {/* Edit popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingStep(step)}
                  >
                    Edit
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <h3 className="font-semibold text-gray-800 mb-2">Edit Step</h3>
                  <div className="space-y-2">
                    <div>
                      <Label>Image</Label>
                      <Input
                        type="file"
                        onChange={e =>
                          setEditForm(f => ({ ...f, image: e.target.files?.[0] }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        type="file"
                        onChange={e =>
                          setEditForm(f => ({ ...f, icon: e.target.files?.[0] }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editForm.title ?? step.title}
                        onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={editForm.description ?? step.description}
                        onChange={e =>
                          setEditForm(f => ({ ...f, description: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Order</Label>
                      <Input
                        type="number"
                        value={editForm.order ?? step.order}
                        onChange={e =>
                          setEditForm(f => ({ ...f, order: Number(e.target.value) }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Status Text</Label>
                      <Input
                        value={editForm.statusText ?? step.statusText}
                        onChange={e =>
                          setEditForm(f => ({ ...f, statusText: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Active</Label>
                      <select
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={(editForm.isActive ?? step.isActive) ? "true" : "false"}
                        onChange={e =>
                          setEditForm(f => ({ ...f, isActive: e.target.value === "true" }))
                        }
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" onClick={handleEditSave}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingStep(null)
                          setEditForm({})
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(step.id)}
              >
                Delete
              </Button>
            </div>

            {/* Step image */}
            <img
              src={step.imageUrl}
              alt={step.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <CardContent>
              <CardTitle className="text-lg font-bold">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No steps found.</p>
      )}
    </div>
  )
}
