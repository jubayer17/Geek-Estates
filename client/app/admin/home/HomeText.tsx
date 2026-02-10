"use client"

import { useEffect, useState } from "react"
import config from "@/app/config"
import { toast } from "sonner"
import HomeTextCard from "./HomeCard"
import { HomeText } from "./home.type"

export default function HomeTextPage() {
  const [homeTexts, setHomeTexts] = useState<HomeText[]>([])
  const [loading, setLoading] = useState(false)

  const fetchHomeTexts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${config.base_url}/text`)
      if (!res.ok) throw new Error("Failed to fetch home texts")
      
      const json = await res.json()

      // Directly assign JSON since API returns array, NOT { data: [...] }
      setHomeTexts(Array.isArray(json) ? json : [])

    } catch (err) {
      console.error(err)
      toast.error("Failed to load home texts")
      setHomeTexts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHomeTexts()
  }, [])

  const updateHomeText = async (id: string, updatedData: Partial<HomeText>) => {
    try {
      const res = await fetch(`${config.base_url}/text/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
      if (!res.ok) throw new Error("Failed to update home text")

      const updatedItem = await res.json()
      setHomeTexts((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      )
      toast.success("Home text updated successfully")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update home text")
    }
  }

  if (loading) return <p>Loading...</p>

  if (homeTexts.length === 0) return <p>No home text found</p>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {homeTexts.map((item) => (
          <HomeTextCard
            key={item.id}
            data={item}
            onUpdate={updateHomeText}
          />
        ))}
      </div>
    </div>
  )
}
