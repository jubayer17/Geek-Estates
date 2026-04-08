// components/EditNewsDialog.tsx
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { News } from "./news.types"
import config from "@/app/config"

export default function EditNewsDialog({ news }: { news: News }) {
  const [title, setTitle] = useState(news.title)
  const [subtitle, setSubtitle] = useState(news.subtitle)
  const [content, setContent] = useState(news.content)
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpdate() {
    setLoading(true)

    const formData = new FormData()

    if (image) {
      formData.append("image", image)
    }

    formData.append(
      "data",
      JSON.stringify({
        title,
        subtitle,
        content,
        category: news.category,
      })
    )

    await fetch(`${config.base_url}/news/${news.id}`, {
      method: "PUT",
      body: formData,
    })

    setLoading(false)
    location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit News</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Update News"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
