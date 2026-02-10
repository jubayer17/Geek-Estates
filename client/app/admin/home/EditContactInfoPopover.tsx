"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ContactInfo } from "./ContactInfoPage"

export default function EditContactPopover({
  data,
  onSubmit,
}: {
  data: ContactInfo
  onSubmit?: (values: ContactInfo) => void
}) {
  const [form, setForm] = useState<ContactInfo>(data)

  const updateField = (key: keyof ContactInfo, value: any) =>
    setForm({ ...form, [key]: value })

  const updateOpeningHour = (index: number, key: string, value: any) => {
    const updated = [...form.openingHours]
    updated[index] = { ...updated[index], [key]: value }
    setForm({ ...form, openingHours: updated })
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(form)
      }}
    >
      <h3 className="font-semibold text-lg">Edit Contact Info</h3>

      <div className="space-y-1">
        <Label>Full Address</Label>
        <Input
          value={form.fullAddress}
          onChange={(e) => updateField("fullAddress", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Country</Label>
        <Input
          value={form.country}
          onChange={(e) => updateField("country", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Phone</Label>
        <Input
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <p className="font-medium">Opening Hours</p>
        {form.openingHours.map((item, index) => (
          <div key={item.id} className="rounded-md border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{item.days}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Closed</span>
                <Switch
                  checked={item.isClosed}
                  onCheckedChange={(v) =>
                    updateOpeningHour(index, "isClosed", v)
                  }
                />
              </div>
            </div>

            {!item.isClosed && (
              <div className="flex gap-2">
                <Input
                  placeholder="Open"
                  value={item.openTime ?? ""}
                  onChange={(e) =>
                    updateOpeningHour(index, "openTime", e.target.value)
                  }
                />
                <Input
                  placeholder="Close"
                  value={item.closeTime ?? ""}
                  onChange={(e) =>
                    updateOpeningHour(index, "closeTime", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  )
}
