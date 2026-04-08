"use client"

import { useEffect, useState } from "react"
import BannerCard from "./BannerCard"
import config from "@/app/config"
import { Banner } from "./home.type"

export default function HomeBannerPage() {
  const [banners, setBanners] = useState<Banner[]>([])

  const fetchBanners = async () => {
    try {
      const res = await fetch(`${config.base_url}/heroBanner`)
      const json = await res.json()
      setBanners(Array.isArray(json.data) ? json.data : [])
    } catch (err) {
      console.error("Failed to fetch banners", err)
      setBanners([])
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const deleteBanner = async (id: string) => {
    const res = await fetch(`${config.base_url}/heroBanner/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      console.error("Failed to delete banner")
      return
    }

    setBanners((prev) => prev.filter((b) => b.id !== id))
  }

  const updateBanner = async (id: string, formData: FormData) => {
    const res = await fetch(`${config.base_url}/heroBanner/${id}`, {
      method: "PUT",
      body: formData,
    })

    if (!res.ok) {
      console.error("Failed to update banner")
      return
    }

    await fetchBanners()
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.isArray(banners) &&
        banners.map((banner: Banner) => (
          <BannerCard
            key={banner.id}
            banner={banner}
            onDelete={deleteBanner}
            onUpdate={updateBanner}
          />
        ))}
    </div>
  )
}
