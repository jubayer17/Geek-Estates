"use client"

import { useEffect, useState } from "react"
import config from "@/app/config"
import { News } from "./news.types"
import NewsCard from "./NewsCard"
import AddNewsDialog from "./AddNews"

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${config.base_url}/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map(item => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>

    <div className="flex justify-center items-center mt-1.5">
      <AddNewsDialog/>
    </div>
    </div>


  )
}
