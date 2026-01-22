"use client"

import React, { useState } from "react"
import blogs from "../../public/data/news.json"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Blog } from "@/app/blogs/[slug]/page"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons" // optional icon

export default function BlogPage() {
  const typedBlogs = blogs as Blog[]

  // Sort latest first (by date descending)
  const sortedBlogs = [...typedBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const [search, setSearch] = useState("")

  // Filter blogs by search
  const filteredBlogs = sortedBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="bg-[#F5F5F5] py-24 px-6 md:px-20 min-h-screen">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-black text-4xl md:text-5xl mb-4 md:mb-0">
          News & Blogs
        </h1>

        {/* Search */}
        <div className="flex items-center bg-zinc-900 rounded-lg overflow-hidden w-full md:w-auto">
          <span className="px-3 text-gray-400">
            <MagnifyingGlassIcon />
          </span>
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 text-white placeholder-gray-400 py-2 px-3 outline-none w-full md:w-64"
          />
        </div>
      </motion.div>

      {/* Blog grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer"
          >
            <Link href={`/blogs/${blog.slug}`}>
              <div className="relative h-64 overflow-hidden">
                {/* Lazy loading image */}
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{blog.excerpt}</p>
                <span className="text-gray-500 text-xs">{blog.date}</span>
              </div>
            </Link>
          </motion.div>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="text-gray-400 col-span-full text-center">
            No blogs found.
          </p>
        )}
      </div>
    </section>
  )
}
