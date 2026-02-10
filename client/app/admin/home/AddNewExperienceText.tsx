"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import config from "@/app/config"

export default function AddExperienceText() {
  const [form, setForm] = useState({
    number: 0,
    suffix: "+",
    title: "",
    description: "",
    order: 0,
    isActive: true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    // Manual validation
    if (!form.title.trim()) return toast.error("Title is required")
    if (!form.description.trim()) return toast.error("Description is required")
    if (form.number <= 0) return toast.error("Number must be greater than 0")
    if (form.order <= 0) return toast.error("Order must be greater than 0")

    setLoading(true)
    try {
      const res = await fetch(`${config.base_url}/experienceText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to add experience text")
      toast.success("Experience text added!")
      setForm({ number: 0, suffix: "+", title: "", description: "", order: 0, isActive: true })
    } catch (err) {
      console.error(err)
      toast.error("Failed to add experience text")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add Experience Text
        </h2>

        <div className="space-y-4">
          {/* Number */}
          <div>
            <Label className="text-gray-900 font-medium">Number</Label>
            <Input
              type="number"
              value={form.number}
              onChange={(e) => setForm(f => ({ ...f, number: Number(e.target.value) }))}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Suffix */}
          <div>
            <Label className="text-gray-900 font-medium">Suffix</Label>
            <Input
              value={form.suffix}
              onChange={(e) => setForm(f => ({ ...f, suffix: e.target.value }))}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Title */}
          <div>
            <Label className="text-gray-900 font-medium">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
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
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </div>

          {/* Order */}
          <div>
            <Label className="text-gray-900 font-medium">Order</Label>
            <Input
              type="number"
              value={form.order}
              onChange={(e) => setForm(f => ({ ...f, order: Number(e.target.value) }))}
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

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            {loading ? "Adding..." : "Add Experience Text"}
          </Button>
        </div>
      </div>
    </div>
  )
}
