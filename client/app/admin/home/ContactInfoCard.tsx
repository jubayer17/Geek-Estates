"use client"

import { ContactInfo } from "./ContactInfoPage"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import EditContactPopover from "./EditContactInfoPopover"
import config from "@/app/config"

export default function ContactInfoCard({ data }: { data: ContactInfo }) {
  const [contact, setContact] = useState(data)

  

  // Delete contact info
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact info?")) return
    try {
      const res = await fetch(`${config.base_url}/contactInfo/${contact.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Contact info deleted successfully!")
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete contact info")
    }
  }

  return (
    <Card className="relative max-w-xl w-full">
      {/* Edit & Delete Buttons */}
      <div className="absolute right-4 top-4 flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline">
              <Pencil className="h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[420px] max-h-[80vh] overflow-y-auto">
            <EditContactPopover
              data={contact}
              onSubmit={async (values: any) => {
                try {
                  // Prepare payload
                  const payload = {
                    fullAddress: values.fullAddress,
                    country: values.country,
                    phone: values.phone,
                    email: values.email,
                    openingHours: values.openingHours.map((oh: any) => ({
                      days: oh.days,
                      openTime: oh.isClosed ? null : oh.openTime,
                      closeTime: oh.isClosed ? null : oh.closeTime,
                      isClosed: oh.isClosed ?? false,
                    })),
                  }

                 
                  console.log("Payload:", payload)

                  const res = await fetch(`${config.base_url}/contactInfo/${contact.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  })

                  if (!res.ok) throw new Error("Failed to update contact info")
                  const updatedData = await res.json()
                  setContact(updatedData)
                  toast.success("Contact info updated successfully!")
                } catch (error) {
                  console.error(error)
                  toast.error("Failed to update contact info")
                }
              }}
            />
          </PopoverContent>
        </Popover>

        <Button size="icon" variant="destructive" onClick={handleDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Info label="Address" value={contact.fullAddress} />
        <Info label="Country" value={contact.country} />
        <Info label="Phone" value={contact.phone} />
        <Info label="Email" value={contact.email} />

        <Separator />

        <div>
          <p className="font-medium mb-2">Opening Hours</p>
          <div className="space-y-1 text-sm">
            {contact.openingHours.map((item, idx) => (
              <div key={idx}>
                <span className="font-medium">{item.days}:</span>{" "}
                {item.isClosed
                  ? "Closed"
                  : `${item.openTime} - ${item.closeTime}`}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p>{value}</p>
    </div>
  )
}
