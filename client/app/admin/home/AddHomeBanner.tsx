"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import config from "@/app/config"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"

export default function AddHeroBanner() {
  const router = useRouter()

  const [form, setForm] = useState({
    badgeText: "",
    title: "",
    subtitle: "",
    buttonText1: "",
    buttonText2: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Track validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Validate form manually
  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = `${key} is required`
    })

    if (!image) newErrors.image = "Image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (file: File | null) => {
    setImage(file)
    if (file) setPreview(URL.createObjectURL(file))
    else setPreview(null)
  }

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("image", image!)
      formData.append("data", JSON.stringify(form))

      const res = await fetch(`${config.base_url}/heroBanner`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to create banner")

      toast.success("Hero banner created successfully!")
      router.push("/admin/home")
    } catch (err) {
      console.error(err)
      toast.error("Failed to create banner")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Add New Hero Banner</h1>
        <p className="text-gray-500">
          All fields are required. Fill in the details and upload an image.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <Label className="capitalize mb-1 text-gray-700 font-medium">{key}</Label>
              {key === "subtitle" ? (
                <Textarea
                  value={value}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-lg text-gray-900 placeholder-gray-400"
                  placeholder={`Enter ${key}`}
                />
              ) : (
                <Input
                  value={value}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-lg text-gray-900 placeholder-gray-400"
                  placeholder={`Enter ${key}`}
                />
              )}
              {errors[key] && (
                <span className="text-red-500 text-sm mt-1">{errors[key]}</span>
              )}
            </div>
          ))}

          {/* Image Upload */}
          <div className="flex flex-col">
            <Label className="mb-1 text-gray-700 font-medium">Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
            {errors.image && (
              <span className="text-red-500 text-sm mt-1">{errors.image}</span>
            )}
            {preview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 shadow">
                <Image
                  src={preview}
                  alt="Image Preview"
                  width={800}
                  height={400}
                  className="w-full h-60 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => router.push("/admin/home")}
          >
            Cancel
          </Button>
          <Button
            className={`bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Banner"}
          </Button>
        </div>
      </div>
    </div>
  )
}
