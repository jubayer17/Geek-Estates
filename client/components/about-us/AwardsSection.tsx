"use client"

import { motion } from "framer-motion"
import { Trophy, ArrowUpRight } from "lucide-react"

const awards = [
  {
    year: "2025",
    title: "Best Luxury Brokerage",
    organization: "Global Real Estate Awards",
    location: "New York"
  },
  {
    year: "2024",
    title: "Excellence in Design",
    organization: "Architectural Digest",
    location: "London"
  },
  {
    year: "2023",
    title: "Top 100 Agencies",
    organization: "Property Week",
    location: "Dubai"
  },
  {
    year: "2022",
    title: "Innovation in Property",
    organization: "Tech & Homes Summit",
    location: "Singapore"
  }
]

export default function AwardsSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-white border-y border-gray-100">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid md:grid-cols-3 gap-16">
          {/* Header */}
          <div className="md:col-span-1">
            <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold mb-4 block flex items-center gap-3">
              <span className="w-8 h-px bg-[#E7C873]"></span>
              Recognition
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] leading-tight mb-6">
              Award-Winning <br /> <span className="italic text-gray-400 font-light">Excellence</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm md:text-base">
              Our commitment to setting industry standards has been recognized globally. We don&apos;t just sell properties; we define the market.
            </p>
            <div className="w-16 h-1 bg-[#E7C873]" />
          </div>

          {/* List */}
          <div className="md:col-span-2">
            <div className="divide-y divide-gray-100 border-t border-gray-100 md:border-t-0">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group py-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors px-6 -mx-6 cursor-default"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <span className="text-[#E7C873] font-bold text-lg font-serif w-16">{award.year}</span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] group-hover:text-[#E7C873] transition-colors">
                        {award.title}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">
                        {award.organization} <span className="text-[#E7C873]">•</span> {award.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                    <ArrowUpRight className="w-6 h-6 text-[#E7C873]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
