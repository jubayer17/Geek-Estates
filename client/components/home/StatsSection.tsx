"use client"

import React, { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import config from "@/app/config"

gsap.registerPlugin(ScrollTrigger)

// Define the type for a stat item
type Stat = {
  id: string
  number: number
  suffix: string
  title: string
  description: string
  order: number
  isActive: boolean
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [stats, setStats] = useState<Stat[]>([])

  // Fetch data from your API
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${config.base_url}/companyExperienceText`) // Replace with your actual API URL
        if (!res.ok) throw new Error("Network response was not ok")
        const data: Stat[] = await res.json()
        // Optionally, filter only active stats and sort by order
        const activeStats = data
          .filter((stat) => stat.isActive)
          .sort((a, b) => a.order - b.order)
        setStats(activeStats)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    if (stats.length === 0) return // Don't run GSAP if no data yet

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef)

      // 1. Background Big Text Animation
      gsap.set(selector('[data-anim="bg-letter"]'), {
        opacity: 0,
        x: -50,
        rotateY: 90,
      })
      gsap.to(selector('[data-anim="bg-letter"]'), {
        opacity: 0.03, // Keep it subtle
        x: 0,
        rotateY: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })

      // 2. Header Content Animation
      gsap.from(".stats-header-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })

      // 3. Staircase Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const isEven = index % 2 === 0

        gsap.fromTo(
          card,
          {
            x: isEven ? -100 : 100,
            opacity: 0,
            filter: "blur(8px)",
            willChange: "transform, opacity, filter",
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // Number Counter
        const numberEl = card.querySelector(".stat-number")
        const targetValue = stats[index].number

        if (numberEl) {
          gsap.fromTo(
            numberEl,
            { innerText: 0 },
            {
              innerText: targetValue,
              duration: 2.5,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              onUpdate: function () {
                if (numberEl) {
                  numberEl.textContent = Math.ceil(
                    Number(this.targets()[0].innerText)
                  ).toString()
                }
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [stats])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-900"
    >
      {/* Background Big Text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex items-start justify-center">
        <h2
          className="text-[12vw] md:text-[14vw] font-black text-white/5 leading-none whitespace-nowrap pt-10"
          data-anim="bg-letter"
        >
          MILESTONES
        </h2>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 lg:px-4">
        {/* Header */}
        <div className="mb-20 ml-16 md:mb-32 max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-20">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6 md:mb-8 stats-header-item">
                <span className="w-8 md:w-12 h-[1px] bg-[#E7C873]"></span>
                <span className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-xs  md:text-sm">
                  Our Journey
                </span>
              </div>

              <div className="relative stats-header-item">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.9]">
                  Legacy of
                </h2>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#E7C873] leading-[0.9] mt-4 md:ml-24">
                  <span className="relative inline-block">
                    Trust
                    <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">
                      *
                    </span>
                  </span>
                </h2>
              </div>
            </div>

            <div className="lg:max-w-md pb-4 stats-header-item">
              <p className="text-white/60 text-sm md:text-lg leading-relaxed border-l border-white/10 pl-4 md:pl-6">
                Building the future with precision, passion, and a commitment to
                excellence. We don&apos;t just build structures; we create
                landmarks that stand the test of time.
              </p>
            </div>
          </div>
        </div>

        {/* Staircase Cards */}
        <div className="flex flex-col w-full gap-y-8 md:gap-y-6">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="relative w-full md:w-[99%] lg:w-[99%] mx-auto h-auto md:h-[150px] bg-white/5 backdrop-blur-md border-l-4 border-[#E7C873] group hover:bg-white/10 transition-colors duration-500 p-4 md:p-0 md:px-8 md:flex md:items-center"
              style={{
                marginLeft: index % 2 === 0 ? "0" : "5%",
                marginRight: index % 2 !== 0 ? "0" : "5%",
              }}
            >
              {/* Inner Content */}
              <div className="flex items-center gap-3 md:gap-10 w-full">
                {/* ID */}
                <span className="font-mono text-[#E7C873] text-sm md:text-lg tracking-widest opacity-30 group-hover:opacity-100 transition-opacity hidden sm:block">
                  / {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>

                {/* Number & Label */}
                <div className="flex-1 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6">
                  <div className="flex items-baseline">
                    <span className="stat-number text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                      {stat.number}
                    </span>
                    <span className="text-xl md:text-4xl font-serif italic text-[#E7C873] ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                  <h3 className="text-[10px] sm:text-xs md:text-base font-medium text-white/70 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                    {stat.title}
                  </h3>
                </div>

                {/* Divider (Desktop) */}
                <div className="hidden md:block w-px h-12 bg-white/10 group-hover:bg-[#E7C873]/30 transition-colors"></div>

                {/* Description (Desktop) */}
                <p className="hidden md:block text-white/40 text-sm leading-relaxed max-w-xs group-hover:text-white/60 transition-colors">
                  {stat.description}
                </p>

                {/* Action Icon */}
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E7C873] group-hover:border-[#E7C873] group-hover:text-black transition-all duration-500 shrink-0">
                  <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 text-white/40 group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
