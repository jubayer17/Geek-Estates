"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import config from "@/app/config"

export default function AddPropertySearch() {
  const [form, setForm] = useState({
    stepNumber: 0,
    title: "",
    description: "",
    order: 0,
    statusText: "Active",
    isActive: true,
    image: null as File | null,
    icon: null as File | null,
  })

  const [loading, setLoading] = useState(false)

  // Handle form submission with validations
  const handleSubmit = async () => {
    if (form.stepNumber <= 0) return toast.error("Step Number must be greater than 0")
    if (!form.title.trim()) return toast.error("Title is required")
    if (!form.description.trim()) return toast.error("Description is required")
    if (form.order <= 0) return toast.error("Order must be greater than 0")
    if (!form.statusText.trim()) return toast.error("Status Text is required")
    if (!form.image) return toast.error("Image is required")
    if (!form.icon) return toast.error("Icon is required")

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("stepNumber", String(form.stepNumber))
      formData.append("title", form.title)
      formData.append("description", form.description)
      formData.append("order", String(form.order))
      formData.append("statusText", form.statusText)
      formData.append("isActive", String(form.isActive))
      if (form.image) formData.append("image", form.image)
      if (form.icon) formData.append("icon", form.icon)

      const res = await fetch(`${config.base_url}/propertySearch`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to add property search step")

      toast.success("Property search step added!")
      setForm({
        stepNumber: 0,
        title: "",
        description: "",
        order: 0,
        statusText: "Active",
        isActive: true,
        image: null,
        icon: null,
      })
    } catch (err) {
      console.error(err)
      toast.error("Failed to add property search step")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add Property Search Step</h2>

        <div className="space-y-4">
          {/* Step Number */}
          <div>
            <Label className="text-gray-900 font-medium">Step Number</Label>
            <Input
              type="number"
              min={1}
              value={form.stepNumber || ""}
              onChange={(e) => setForm(f => ({ ...f, stepNumber: Number(e.target.value) }))}
              placeholder="Enter step number"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Title */}
          <div>
            <Label className="text-gray-900 font-medium">Title</Label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Enter title"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-gray-900 font-medium">Description</Label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              placeholder="Enter description"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </div>

          {/* Order */}
          <div>
            <Label className="text-gray-900 font-medium">Order</Label>
            <Input
              type="number"
              min={1}
              value={form.order || ""}
              onChange={(e) => setForm(f => ({ ...f, order: Number(e.target.value) }))}
              placeholder="Enter order"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Status Text */}
          <div>
            <Label className="text-gray-900 font-medium">Status Text</Label>
            <Input
              type="text"
              value={form.statusText}
              onChange={(e) => setForm(f => ({ ...f, statusText: e.target.value }))}
              placeholder="Enter status text"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Active */}
          <div>
            <Label className="text-gray-900 font-medium">Active</Label>
            <select
              value={form.isActive ? "true" : "false"}
              onChange={(e) => setForm(f => ({ ...f, isActive: e.target.value === "true" }))}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

         {/* Image */}
<div>
  <Label className="text-gray-900 font-medium mb-1">Image</Label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setForm(f => ({ ...f, image: e.target.files?.[0] ?? null }))}
    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
  />
  {form.image && (
    <p className="mt-1 text-sm text-gray-700">Selected: {form.image.name}</p>
  )}
</div>

<div className="mt-4">
  <Label className="text-gray-900 font-medium mb-1">Icon</Label>
  <input
    type="file"
    accept="image/*"
    placeholder="Give an icon"
    onChange={(e) => setForm(f => ({ ...f, icon: e.target.files?.[0] ?? null }))}
    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
  />
  {form.icon && (
    <p className="mt-1 text-sm text-gray-700">Selected: {form.icon.name}</p>
  )}
</div>


          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            {loading ? "Adding..." : "Add Step"}
          </Button>
        </div>
      </div>
    </div>
  )
}
