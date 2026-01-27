"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const cities = [
  {
    name: "Dhaka",
    count: "320+ Properties",
    image: "/outdoor-real-state/1.webp",
    className: "md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[400px]"
  },
  {
    name: "Chittagong",
    count: "145+ Properties",
    image: "/outdoor-real-state/2.webp",
    className: "md:col-span-1 md:row-span-2 min-h-[300px] md:min-h-[400px]"
  },
  {
    name: "Sylhet",
    count: "89+ Properties",
    image: "/outdoor-real-state/3.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]"
  },
  {
    name: "Cox's Bazar",
    count: "65+ Properties",
    image: "/outdoor-real-state/4.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]"
  },
  {
    name: "Rajshahi",
    count: "42+ Properties",
    image: "/outdoor-real-state/5.webp",
    className: "md:col-span-2 md:row-span-1 min-h-[200px]"
  },
  {
    name: "Khulna",
    count: "38+ Properties",
    image: "/outdoor-real-state/6.webp",
    className: "md:col-span-2 md:row-span-1 min-h-[200px]"
  }
]

export default function FindProperties() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Background Animation
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: "56.57px 0px",
        duration: 3,
        ease: "none",
        repeat: -1
      })
    }

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef)

      // Initial States
      gsap.set(selector('[data-anim="bg-letter"]'), { rotateX: 90, opacity: 0, transformPerspective: 1000 })
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
      gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })
      gsap.set(selector('[data-anim="city-card"]'), { opacity: 0, y: 50 })

      // Header Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(selector('[data-anim="bg-letter"]'), { rotateX: 0, opacity: 0.03, duration: 1.2, stagger: 0.08, ease: "back.out(1.7)" })
        .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=1.0")
        .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=0.8")
        .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(selector('[data-anim="city-card"]'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.6")

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-slate-50 overflow-hidden relative"
    >
      {/* Unique 'Diagonal Drafting' Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Diagonal Drafting Lines (The 'Blueprint' Texture) - Animated */}
        <div ref={bgRef} className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 40px)'
          }}>
        </div>

        {/* 3. Zone Markers (Bordered Areas) */}
        <div className="absolute top-20 left-10 w-64 h-64 border-t border-l border-slate-300 opacity-50">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 tracking-widest"></div>
        </div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-b border-r border-[#E7C873] opacity-30">
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#E7C873] tracking-widest"></div>
        </div>

        {/* 4. Large Compass Rose Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-slate-300 rounded-full opacity-20"></div>

        {/* 5. Gold Gradient Highlights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#E7C873]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#E7C873]/5 to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div ref={headerRef} className="relative mb-16 md:mb-24">
          {/* Background Big Text */}
          <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
            <h2 className="text-[18vw] font-bold text-slate-900 leading-none tracking-tighter text-left flex">
              {"LOCATIONS".split("").map((letter, i) => (
                <span key={i} data-anim="bg-letter" className="inline-block opacity-0">
                  {letter}
                </span>
              ))}
            </h2>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-20 pt-10">
            <div className="flex-1">
              <div className="flex items-center ml-0 md:ml-4 gap-4 mb-8">
                <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Destinations</span>
              </div>

              <div className="relative left-0 md:left-4">
                <div className="overflow-hidden">
                  <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight leading-[0.9]">
                    Prime
                  </h2>
                </div>
                <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                  <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-slate-800 leading-[0.9]">
                    <span className="relative inline-block">
                      Locations
                      <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                    </span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="lg:max-w-md pb-4">
              <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
                Discover exclusive properties in the most coveted districts, curated for the discerning buyer.
              </p>
            </div>
          </div>
        </div>

        {/* Unique Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {cities.map((city, index) => (
            <Link
              href="#"
              key={index}
              data-anim="city-card"
              className={`group relative overflow-hidden cursor-pointer ${city.className}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Hover Overlay (Gold Tint) */}
              <div className="absolute inset-0 bg-[#E7C873]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E7C873]/90 text-slate-900 text-xs font-semibold tracking-wider mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {city.count}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                    {city.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#E7C873] mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
