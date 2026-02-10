"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Pencil, Trash } from "lucide-react"
import { Banner } from "./home.type"
import EditBannerDialog from "./EditBannerDialog"


type Props = {
  banner?: Banner
  onDelete: (id: string) => void
  onUpdate: (id: string, data: FormData) => Promise<void>
}

export default function BannerCard({ banner, onDelete, onUpdate }: Props) {
  const [open, setOpen] = useState(false)

  // 🔒 Prevent runtime crash
  if (!banner) return null

  return (
    <>
      <Card className="relative overflow-hidden">
        <Image
          src={`${banner.imageUrl}?v=${banner.updatedAt ?? ""}`}
          alt={banner.title}
          width={800}
          height={500}
          className="h-95 w-full object-cover"
        />

        {/* Top-right actions */}
        <div className="absolute right-3 top-3 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete(banner.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Overlay */}
        <CardContent className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent text-white">
          <span className="mb-2 w-fit rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
            {banner.badgeText}
          </span>

          <h2 className="text-2xl font-bold">{banner.title}</h2>
          <p className="mt-2 text-sm opacity-90">{banner.subtitle}</p>

          <div className="mt-4 flex gap-3">
            <Button>{banner.buttonText1}</Button>
            <Button variant="outline" className="border-white text-white">
              {banner.buttonText2}
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditBannerDialog
        open={open}
        setOpen={setOpen}
        banner={banner}
        onUpdate={onUpdate}
      />
    </>
  )
}
