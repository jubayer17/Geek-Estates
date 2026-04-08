'use client'

import { useState, useEffect } from "react"
import StayConnectedCard from "./StayConnectedCard"
import config from "@/app/config"

export default function StayConnectedPageWrapper() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${config.base_url}/newsletter-section`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch data")
        const json = await res.json()
        setData(json)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!data) return <p>No data found</p>

  return <StayConnectedCard data={data} />
}
