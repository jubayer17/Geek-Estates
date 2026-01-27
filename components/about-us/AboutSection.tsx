"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] w-full overflow-hidden shadow-2xl">
              <Image
                src="/BannerImage.avif"
                alt="Luxury Real Estate Interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Sharp geometric overlay */}
              <div className="absolute inset-0 border-[1px] border-white/20 m-4 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Floating Badge - Sharp & Unique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-[#E7C873] p-10 shadow-xl hidden md:block border-l-4 border-[#1A1A1A]"
            >
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#1A1A1A]" /> {/* Decorative corner */}
              <p className="text-[#1A1A1A] font-serif text-5xl font-bold leading-none">15+</p>
              <p className="text-[#1A1A1A] text-sm font-bold uppercase tracking-widest mt-2">Years of<br />Excellence</p>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-[2px] w-12 bg-[#E7C873]" />
                <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
                Crafting Legacies in <br />
                <span className="italic text-gray-500">Luxury Real Estate</span>
              </h2>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed font-light">
              Founded on the principles of integrity and innovation, Geek Real Estate has established itself as a premier destination for luxury property solutions. We believe that a home is more than just a place to live—it&apos;s a sanctuary, a statement, and a legacy.
            </p>

            <p className="text-gray-500 text-lg leading-relaxed font-light">
              Our curated portfolio features the most exclusive properties, designed for those who seek the extraordinary. From penthouse suites to sprawling estates, we connect discerning clients with homes that reflect their achievements and aspirations.
            </p>

            <div className="pt-4">
              <Button className="bg-[#1A1A1A] hover:bg-[#333] text-white px-8 py-6 text-lg rounded-none transition-all duration-300 hover:shadow-lg group">
                Explore Our Portfolio
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
