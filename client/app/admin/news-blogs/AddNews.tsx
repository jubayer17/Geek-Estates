"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import config from "@/app/config"
import {toast} from "sonner"
export default function AddNewsDialog() {
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleAdd() {
    if (!title || !subtitle || !content || !category) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    const formData = new FormData()
    if (image) formData.append("image", image)

    formData.append(
      "data",
      JSON.stringify({ title, subtitle, content, category })
    )

    const res = await fetch(`${config.base_url}/news`, {
      method: "POST",
      body: formData,
    })

    setLoading(false)

    if (res.ok) {
      toast.success("News added successfully")
      location.reload()
    } else {
      toast.error("Failed to add news")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2 border-2">
          <PlusCircle className="w-5 h-5" />
          <span>Add News</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add News</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <Input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
          />

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="min-h-[140px]"
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Market Trends">Market Trends</SelectItem>
              <SelectItem value="Real Estate Trends">Real Estate Trends</SelectItem>
              <SelectItem value="Sustainability">Sustainability</SelectItem>
              <SelectItem value="Advice & Tips">Advice & Tips</SelectItem>
              <SelectItem value="Advice & Tips">INVESTMENT</SelectItem>
              <SelectItem value="Advice & Tips">LIFESTYLE</SelectItem>
              <SelectItem value="Advice & Tips">DESIGN</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <Button
            onClick={handleAdd}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Adding..." : "Add News"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
