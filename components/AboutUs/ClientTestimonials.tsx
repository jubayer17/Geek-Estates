"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Property Investor",
    company: "Global Assets Ltd",
    content: "The level of professionalism and market insight Geek Real Estate provided was unparalleled. They didn't just find me a property; they found me a cornerstone for my portfolio. The ROI has exceeded all expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    company: "Tech Entrepreneur",
    content: "From the first viewing to the final signature, the experience was seamless. Their attention to detail and commitment to my needs made all the difference. It felt less like a transaction and more like a partnership.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Architect",
    company: "Design Studio X",
    content: "As someone in the industry, I have high standards. Geek Real Estate exceeded them. Their curated selection of properties is truly world-class, with an eye for architectural integrity that is rare to find.",
    rating: 5
  },
  {
    id: 4,
    name: "James Sterling",
    role: "CEO",
    company: "Sterling Corp",
    content: "Efficiency, discretion, and excellence. They understood my time constraints and delivered a perfect penthouse solution in record time. Their network is evidently vast and incredibly effective.",
    rating: 5
  }
]

export default function ClientTestimonials() {
  const [activeId, setActiveId] = useState(1)

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 w-px h-full bg-gray-50" />
        <div className="absolute right-[10%] top-0 w-px h-full bg-gray-50" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Navigation */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#E7C873] uppercase tracking-[0.2em] text-sm font-bold mb-4 block">
                Client Voices
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight mb-8">
                Stories of <br />
                <span className="italic text-gray-400">Excellence</span>
              </h2>
            </motion.div>

            <div className="flex flex-col space-y-2">
              {testimonials.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`group flex items-center justify-between p-6 text-left transition-all duration-500 border-l-2 ${activeId === item.id
                      ? 'border-[#E7C873] bg-gray-50 pl-8'
                      : 'border-transparent hover:bg-gray-50/50 pl-4 hover:pl-6'
                    }`}
                >
                  <div>
                    <h4 className={`text-lg font-serif transition-colors duration-300 ${activeId === item.id ? 'text-[#1A1A1A] font-medium' : 'text-gray-400 group-hover:text-gray-600'
                      }`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{item.role}</p>
                  </div>
                  {activeId === item.id && (
                    <motion.div
                      layoutId="activeArrow"
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-[#E7C873]" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content Display */}
          <div className="lg:col-span-8 relative min-h-[400px]">
            <div className="absolute top-0 left-0 -translate-x-8 -translate-y-8 opacity-[0.03] text-[#1A1A1A] pointer-events-none">
              <Quote size={200} />
            </div>

            <AnimatePresence mode="wait">
              {testimonials.map((item) => (
                item.id === activeId && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative pt-8 pl-8 md:pl-16 border-l border-gray-100"
                  >
                    <div className="flex gap-1 mb-8">
                      {[...Array(item.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-[#E7C873] text-[#E7C873]" />
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-2xl md:text-4xl font-light text-[#1A1A1A] leading-relaxed font-serif italic mb-10">
                      &quot;{item.content}&quot;
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-[#E7C873]" />
                      <div className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">
                        {item.company}
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
