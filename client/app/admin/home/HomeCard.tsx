"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { HomeText } from "./home.type"
import EditHomeTextDialog from "./EditBannerDialog"


type Props = {
  data: HomeText
  onUpdate: (id: string, updatedData: any) => void
}

export default function HomeTextCard({ data, onUpdate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className="relative w-full max-w-lg">
        <CardContent>
          {/* Top-right edit button */}
          <div className="absolute right-3 top-3">
            <Button size="icon" variant="secondary" onClick={() => setOpen(true)}>
              <Pencil className="w-4 h-4" />
            </Button>
          </div>

          <h2 className="text-xl font-bold">{data.title}</h2>
          <h3 className="text-lg font-semibold text-indigo-600 mt-1">{data.emphasis}</h3>
          <p className="mt-2 text-gray-700">{data.description}</p>
          <p className="mt-2 text-sm text-gray-400">Journey Tag: {data.journeyTag}</p>
          <p className="mt-1 text-sm text-gray-400">
            Status: {data.isActive ? "Active" : "Inactive"}
          </p>
        </CardContent>
      </Card>

      <EditHomeTextDialog
        open={open}
        setOpen={setOpen}
        data={data}
        onUpdate={onUpdate}
      />
    </>
  )
}
