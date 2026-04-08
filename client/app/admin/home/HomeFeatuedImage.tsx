"use client"

import { useEffect, useState } from "react"
import config from "@/app/config"
import { toast } from "sonner"
import { FeaturedImage } from "./home.type"
import FeaturedImageCard from "./HomeFeaturedImageCard"


export default function HomeFeaturedImagePage() {
  const [items, setItems] = useState<FeaturedImage[]>([])
  const [loading, setLoading] = useState(false)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${config.base_url}/featuredImage`)
      if (!res.ok) throw new Error("Failed to fetch featured images")
      const json = await res.json()
      setItems(Array.isArray(json) ? json : [])
    } catch (error) {
      console.error(error)
      toast.error("Failed to load featured images")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const updateItem = async (id: string, formData: FormData) => {
    try {
      const res = await fetch(`${config.base_url}/featuredImage/${id}`, {
        method: "PUT",
        body: formData,
      })

      if (!res.ok) throw new Error("Update failed")

      // Re-fetch updated list or update state optimistically:
      await fetchItems()
      toast.success("Featured image updated")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update featured image")
    }
  }

  if (loading) return <p>Loading featured images...</p>

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <p>No featured images found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <FeaturedImageCard key={item.id} data={item} onUpdate={updateItem} />
          ))}
        </div>
      )}
    </div>
  )
}
