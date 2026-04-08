"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import config from "@/app/config"
import { ExperienceText } from "./home.type"
import HomeExperienceTextCard from "./HomeExperienceTextCard"

export default function HomeExperienceTextPage() {
  const [items, setItems] = useState<ExperienceText[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch all experience texts
  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${config.base_url}/companyExperienceText`)
      if (!res.ok) throw new Error("Failed to fetch experience texts")
      const json = await res.json()
      setItems(Array.isArray(json) ? json : json.data || [])
    } catch (error) {
      console.error(error)
      toast.error("Failed to load experience texts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Update experience text item
  const updateItem = async (id: string, updatedData: Partial<ExperienceText>) => {
    try {
      const res = await fetch(`${config.base_url}/companyExperienceText/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
      if (!res.ok) throw new Error("Update failed")
      // Update locally
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      )
      toast.success("Updated successfully")
    } catch {
      toast.error("Failed to update experience text")
    }
  }

  // Delete experience text item
  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`${config.base_url}/experienceText/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Delete failed")
      setItems((prev) => prev.filter((item) => item.id !== id))
      toast.success("Deleted successfully")
    } catch {
      toast.error("Failed to delete experience text")
    }
  }

  // Add new experience text form state
  const [newForm, setNewForm] = useState({
    number: 0,
    suffix: "+",
    title: "",
    description: "",
    order: 0,
    isActive: true,
  })

  const [adding, setAdding] = useState(false)

  const handleAddNew = async () => {
    if (
      !newForm.title.trim() ||
      !newForm.description.trim() ||
      newForm.number <= 0 ||
      newForm.order <= 0
    ) {
      toast.error("Please fill all required fields with valid data")
      return
    }

    setAdding(true)
    try {
      const res = await fetch(`${config.base_url}/experienceText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      })
      if (!res.ok) throw new Error("Create failed")

      const created = await res.json()
      setItems((prev) => [...prev, created])
      setNewForm({
        number: 0,
        suffix: "+",
        title: "",
        description: "",
        order: 0,
        isActive: true,
      })
      toast.success("Added new experience text")
    } catch {
      toast.error("Failed to add experience text")
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <p>No experience text found.</p>
        ) : (
          items.map((item) => (
            <HomeExperienceTextCard
              key={item.id}
              data={item}
              onUpdate={updateItem}
              onDelete={deleteItem}
            />
          ))
        )}
      </div>

     
    </div>
  )
}
