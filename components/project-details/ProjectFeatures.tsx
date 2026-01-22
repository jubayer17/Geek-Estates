"use client"

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  title: string
  description: string
  category: string
}

interface ProjectFeaturesProps {
  features: Feature[]
  image?: string
}

export default function ProjectFeatures({ features, image }: ProjectFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Lines
      gsap.fromTo('.divider-line',
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      )

      // Animate Text
      gsap.fromTo('.feature-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Organize into 3 specific rows as requested
  const row1 = features.slice(0, 5)
  const row2 = features.slice(5, 10)
  const row3 = features.slice(10, 15)
  const allRows = [row1, row2, row3]

  return (
    <section ref={containerRef} className="relative py-32 bg-[#FDFBF7] text-neutral-900 overflow-hidden">
      {/* Unique Texture Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="w-full px-4 md:px-12 lg:px-20 max-w-[1920px] mx-auto z-10 relative">

        {/* Header */}
        <div className="mb-24 border-b border-neutral-900/10 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="block text-[#C5A059] font-mono text-xs tracking-widest uppercase mb-4">
              Technical Specifications
            </span>
            <h2 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9]">
              Premium <span className="font-serif italic text-neutral-400">Amenities</span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-md text-sm uppercase tracking-widest mb-2 leading-relaxed text-right">
            Meticulously crafted details <br />
            for an uncompromising lifestyle.
          </p>
        </div>

        {/* The Grid Structure */}
        <div className="flex flex-col border-t border-neutral-900/10">
          {allRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={el => { if (el) rowsRef.current[rowIndex] = el }}
              className="relative group/row"
            >
              {/* Row Content */}
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-900/10 border-b border-neutral-900/10">
                {row.map((feature, featIndex) => {
                  // Calculate global index for numbering
                  const globalIndex = (rowIndex * 5) + featIndex + 1

                  return (
                    <div
                      key={featIndex}
                      className="feature-item flex-1 p-8 md:h-80 flex flex-col justify-between transition-all duration-500 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-10 relative group/item overflow-hidden"
                    >
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                        <Plus className="w-4 h-4 text-[#C5A059] rotate-0 group-hover/item:rotate-90 transition-transform duration-700" />
                      </div>

                      {/* Number & Category */}
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs text-neutral-300 group-hover/item:text-[#C5A059] transition-colors duration-300">
                          {(globalIndex).toString().padStart(2, '0')}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest border border-neutral-900/10 px-2 py-1 rounded-full text-neutral-400 group-hover/item:border-[#C5A059] group-hover/item:text-[#C5A059] transition-all duration-300">
                          {feature.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-8 relative z-10">
                        <h3 className="text-xl font-medium leading-tight mb-3 group-hover/item:translate-y-[-4px] transition-transform duration-300">
                          {feature.title}
                        </h3>

                        {/* Description Reveal */}
                        <div className="relative overflow-hidden h-0 group-hover/item:h-auto transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                          <div className="pt-4 border-t border-dashed border-neutral-200 group-hover/item:border-[#C5A059]/30 transition-colors duration-500">
                            <p className="text-xs text-neutral-500 leading-relaxed font-light">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Subtle Background Flash on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* Bottom Line Indicator */}
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059] transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left ease-out" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex justify-between items-center text-xs text-neutral-400 uppercase tracking-widest border-t border-neutral-900/5 pt-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
            Premium Selection
          </span>
          <span className="hover:text-neutral-900 cursor-pointer transition-colors">Download Brochure</span>
        </div>

      </div>
    </section>
  )
}
