"use client"

import { useEffect, useState } from "react"
import config from "@/app/config"
import ContactInfoCard from "./ContactInfoCard"

export type OpeningHour = {
  id: string
  contactInfoId: string
  days: string
  openTime: string | null
  closeTime: string | null
  isClosed: boolean
}

export type ContactInfo = {
  id: string
  fullAddress: string
  country: string
  phone: string
  email: string
  createdAt: string
  updatedAt: string
  openingHours: OpeningHour[]
}

export default function ContactInfoPage() {
  const [data, setData] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${config.base_url}/contactInfo`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contact info")
        return res.json()
      })
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading contact info...</p>
  if (!data) return <p>No contact info found</p>

  return <ContactInfoCard data={data} />
}
