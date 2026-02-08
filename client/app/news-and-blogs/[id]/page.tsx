"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import config from "@/app/config"

export type Blog = {
  id: string
  title: string
  subtitle: string
  content: string
  coverImageUrl: string
  category: string
  author: string
  publishedAt: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogDetails() {
  const { id } = useParams() // dynamic id from URL
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchBlog() {
      try {
        const res = await fetch(`${config.base_url}/news/${id}`)
        if (!res.ok) throw new Error("Failed to fetch blog")
        const data: Blog = await res.json()
        setBlog(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (loading) return <div className="text-center py-20">Loading blog...</div>
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>
  if (!blog) return <div className="text-center py-20">Blog not found</div>

  return (
    <section className="bg-[#F5F5F5] min-h-screen px-6 md:px-32 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-black text-4xl font-bold mb-4">{blog.title}</h1>
        <h2 className="text-gray-500 text-xl mb-4">{blog.subtitle}</h2>
        <p className="text-gray-600 mb-8">
          {new Date(blog.publishedAt).toLocaleDateString()} · {blog.author}
        </p>

        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-10">
          <Image
            src={blog.coverImageUrl}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 whitespace-pre-line leading-relaxed text-lg"
        >
          {blog.content}
        </motion.div>
      </motion.div>
    </section>
  )
}
