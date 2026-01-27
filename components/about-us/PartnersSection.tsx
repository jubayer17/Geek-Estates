"use client"

import { motion } from "framer-motion"
import {
  Globe,
  PenTool,
  Crown,
  Building2,
  Armchair,
  TrendingUp,
  LayoutGrid,
  Zap,
  Hexagon,
  Gem
} from "lucide-react"

const partners = [
  { name: "Global Estates", icon: Globe },
  { name: "Prime Arch", icon: PenTool },
  { name: "LuxLiving", icon: Crown },
  { name: "UrbanDev", icon: Building2 },
  { name: "Elite Interiors", icon: Armchair },
  { name: "Skyline", icon: TrendingUp },
  { name: "ModernSpaces", icon: LayoutGrid },
  { name: "FutureHomes", icon: Zap },
  { name: "Nexus Group", icon: Hexagon },
  { name: "Diamond Corp", icon: Gem },
]

export default function PartnersSection() {
  return (
    <section className="py-24 bg-white border-y border-gray-100 overflow-hidden relative">
      {/* Header */}
      <div className="text-left md:text-center mb-16 px-6 md:px-0">
        <div className="flex items-center justify-start md:justify-center gap-4 mb-4">
          <div className="h-px w-8 bg-[#E7C873]/50" />
          <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold">
            Trusted By
          </span>
          <div className="h-px w-8 bg-[#E7C873]/50" />
        </div>
        <h2 className="text-2xl md:text-4xl font-serif text-[#1A1A1A]">
          Industry Partners
        </h2>
      </div>

      {/* Gradient Overlay for Smooth Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite Marquee */}
      <div className="flex">
        <motion.div
          className="flex space-x-16 md:space-x-32 flex-shrink-0 pr-16 md:pr-32"
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Duplicate list for seamless loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-default transition-all duration-500"
            >
              <div className="p-3 bg-gray-50 group-hover:bg-[#E7C873] transition-all duration-500 group-hover:-rotate-12 border border-transparent group-hover:border-[#1A1A1A]">
                <partner.icon className="w-8 h-8 text-gray-600 group-hover:text-[#1A1A1A] transition-colors duration-500" />
              </div>
              <span className="text-xl md:text-2xl font-serif font-medium text-gray-600 group-hover:text-[#1A1A1A] transition-colors duration-500 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Second identical div for the seamless look (in case screen is very wide, though the x: -50% on a doubled list usually covers it. 
            Actually, the standard framer motion marquee technique uses one container with 2x items and translates -50%. 
            Let's stick to the single motion div with doubled content above which is cleaner.
        */}
      </div>
    </section>
  )
}
