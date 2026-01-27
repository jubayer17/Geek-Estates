"use client"
import blogs from "../../../public/data/news.json"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
export type Blog = {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
}


export default function BlogDetails() {
     const { slug } = useParams()
  const blog = (blogs as Blog[]).find(b => b.slug === slug)
  if (!blog) return notFound()

  return (
    <section className="bg-[#F5F5F5] min-h-screen px-6 md:px-32 py-24">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        <h1 className="text-black text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-8">{blog.date} · {blog.author}</p>
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-10">
          <Image src={blog.image} alt={blog.title} fill className="object-cover"/>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-600 whitespace-pre-line leading-relaxed text-lg">
          {blog.content}
        </motion.div>
      </motion.div>
    </section>
  )
}
