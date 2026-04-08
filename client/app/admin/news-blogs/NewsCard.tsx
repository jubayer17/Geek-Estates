// components/news-card.tsx
"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"
import { News } from "./news.types"
import EditNewsPopover from "./EditNewsPopover"
import config from "@/app/config"
import { Badge } from "@/components/ui/badge"

export default function NewsCard({ news }: { news: News }) {
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this news?")
    if (!confirmed) return

    await fetch(`${config.base_url}/news/${news.id}`, {
      method: "DELETE",
    })

    location.reload()
  }

  return (
    <Card className="group relative overflow-hidden border-muted/40 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-3 top-3 z-20 rounded-md bg-black/40 p-1 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <EditNewsPopover  news={news} />
          <DropdownMenuItem 
            className="text-red-600 focus:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={news.coverImageUrl}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category */}
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 z-10 bg-black/60 text-white"
        >
          {news.category}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
          {news.title}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {news.subtitle}
        </p>

        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{news.author}</span>
          <span>
            {new Date(news.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
