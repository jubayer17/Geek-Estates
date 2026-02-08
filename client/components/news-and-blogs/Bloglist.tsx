"use client"

import React, { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MagnifyingGlassIcon, ArrowTopRightIcon } from "@radix-ui/react-icons"

export interface NewsItem {
  id: string
  title: string
  subtitle: string | null
  content: string
  coverImageUrl: string | null
  category: string
  author: string | null
  publishedAt: string | null
}

// Categories configuration
const CATEGORIES = ["All", "Market Trends", "Investment", "Lifestyle", "Design"]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [blogs, setBlogs] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/news')
        if (res.ok) {
          const data = await res.json()
          setBlogs(data)
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Filter logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
        (blog.subtitle || '').toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === "All" || blog.category === activeCategory
      return matchesSearch && matchesCategory
    }).sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
  }, [blogs, search, activeCategory])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <section className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="pt-24 pb-12 px-6 md:px-20 border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-12"
          >
            <div className="relative">
              {/* Decorative Background Text */}
              <span className="absolute -top-16 -left-10 text-[120px] md:text-[180px] font-serif font-bold text-gray-50/80 select-none -z-10 pointer-events-none leading-none overflow-hidden">
                JOURNAL
              </span>

              <span className="text-[#E7C873] uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block flex items-center gap-3">
                <span className="w-8 h-px bg-[#E7C873]"></span>
                The Collection
              </span>

              <h2 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[0.9]">
                <span className="block italic font-light text-gray-400 text-3xl md:text-4xl mb-2">Curated</span>
                Insights <span className="text-[#E7C873] italic font-light">&</span> <br />
                <span className="ml-12 md:ml-24 block italic">Perspectives</span>
              </h2>
            </div>

            {/* Search Bar - Minimalist */}
            <div className="w-full md:w-80 border-b border-gray-200 focus-within:border-[#E7C873] transition-colors relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-3 bg-transparent outline-none text-[#1A1A1A] placeholder-gray-400 font-serif"
              />
              <MagnifyingGlassIcon className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Categories - Premium Tabs */}
          <div className="mt-16 flex flex-wrap gap-8 md:gap-12 border-b border-gray-100 pb-px">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative pb-4 text-sm uppercase tracking-widest transition-colors duration-300 ${activeCategory === category
                  ? "text-[#1A1A1A] font-bold"
                  : "text-gray-400 hover:text-[#1A1A1A]"
                  }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E7C873]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid - Sharp & Elegant */}
      <div className="px-6 md:px-20 py-16">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <Link href={`/news-and-blogs/${blog.id}`} className="block h-full flex flex-col">
                  {/* Image Container - Sharp Edges */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                    <Image
                      src={blog.coverImageUrl || '/placeholder.jpg'}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Category Badge - Floating */}
                    <div className="absolute top-0 left-0 bg-[#1A1A1A] text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {blog.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow relative border-l border-transparent pl-0 group-hover:border-[#E7C873] group-hover:pl-6 transition-all duration-300">
                    <div className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-wider mb-3">
                      <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ''}</span>
                      <span className="w-px h-3 bg-gray-300" />
                      <span>{blog.author}</span>
                    </div>

                    <h3 className="text-2xl font-serif text-[#1A1A1A] leading-snug mb-4 group-hover:text-[#E7C873] transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <p className="text-gray-500 font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {blog.subtitle}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#1A1A1A] group-hover:text-[#E7C873] transition-colors mt-auto">
                      Read Story
                      <ArrowTopRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-serif text-gray-300">No articles found in this category.</h3>
          </div>
        )}
      </div>
    </section>
  )
}
