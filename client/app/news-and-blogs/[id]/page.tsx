"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import { NewsItem } from "@/components/news-and-blogs/Bloglist"

export default function BlogDetails() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [blog, setBlog] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return
      try {
        const res = await fetch(`http://localhost:5000/news/${id}`)
        if (res.ok) {
          const data = await res.json()
          setBlog(data)
        } else {
          setBlog(null)
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-1 w-24 bg-gray-100 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-[#E7C873]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
        <p className="text-[#1A1A1A] font-serif text-sm tracking-[0.2em] uppercase">Loading Story</p>
      </div>
    </div>
  )

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
      <p className="text-[#1A1A1A] font-serif text-2xl">Story not found.</p>
      <button
        onClick={() => router.back()}
        className="text-xs uppercase tracking-[0.2em] border-b border-[#E7C873] pb-1 hover:text-[#E7C873] transition-colors"
      >
        Return to Insights
      </button>
    </div>
  )

  return (
    <article className="min-h-screen bg-white text-[#1A1A1A] selection:bg-[#E7C873] selection:text-white">
      {/* Navigation - Floating */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 pointer-events-none">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.back()}
          className="pointer-events-auto group inline-flex items-center gap-3 text-white mix-blend-difference hover:opacity-70 transition-opacity"
        >
          <div className="p-2 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="hidden md:inline text-xs uppercase tracking-[0.2em] font-medium">Back to Insights</span>
        </motion.button>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[85vh]">
        <Image
          src={blog.coverImageUrl || '/placeholder.jpg'}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 lg:px-40 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl"
          >
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 font-medium">
              <span className="bg-[#E7C873] text-black px-3 py-1.5">{blog.category}</span>
              <span className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
              </span>
              {blog.author && (
                <span className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  {blog.author}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 tracking-tight">
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-lg md:text-2xl text-white/80 font-light italic max-w-3xl leading-relaxed border-l border-[#E7C873] pl-6 ml-1">
                {blog.subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl leading-loose font-light text-gray-800"
        >
          {/* Split content by newlines and wrap in paragraphs for better typography */}
          {blog.content.split('\n').map((paragraph, idx) => {
            if (!paragraph.trim()) return null;
            // Check if it's a list item (simple check)
            if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•')) {
              return <li key={idx} className="ml-4 mb-4 list-disc pl-2 marker:text-[#E7C873]">{paragraph.replace(/^[-•]\s*/, '')}</li>
            }
            // First paragraph dropcap effect styling (optional, kept simple for now)
            return <p key={idx} className="mb-8">{paragraph}</p>
          })}
        </motion.div>

        {/* Footer / Share */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-400 uppercase tracking-[0.2em]">
            Share this story
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#E7C873] hover:text-[#E7C873] hover:bg-[#E7C873]/5 transition-all duration-300">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
