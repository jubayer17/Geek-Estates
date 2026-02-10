'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import config from "@/app/config"

interface Subscriber {
  id: string
  email: string
  name: string | null
  joinedAt: string
  source: string | null
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${config.base_url}/subscribers`, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch subscribers")
        const data = await res.json()
        setSubscribers(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchSubscribers()
  }, [])

  const handleDownload = () => {
    if (!subscribers.length) {
      toast.error("No data to download")
      return
    }

    const headers = ["Email", "Name", "Joined At", "Source"]
    const rows = subscribers.map(s => [s.email, s.name || "", s.joinedAt, s.source || ""])
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "subscribers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("CSV downloaded!")
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscribers</h1>
        <Button onClick={handleDownload} className="border-2">Download CSV</Button>
      </div>

      <ScrollArea className="rounded-lg border border-gray-200">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Source</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {subscribers.map((sub, index) => (
              <tr
                key={sub.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{sub.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sub.name || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(sub.joinedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{sub.source || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  )
}
