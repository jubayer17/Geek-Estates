"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import config from "@/app/config"

gsap.registerPlugin(ScrollTrigger)

// Types
type TextSection = {
  id: string
  journeyTag: string | null
  title: string
  emphasis: string | null
  description: string | null
  createdAt: string
  updatedAt: string
  isActive: boolean
}

type ValuePoint = {
  id: string
  order: number
  label: string
  title: string
  description: string
  imageUrl: string
  iconUrl: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export default function WhyWithUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  const [textSection, setTextSection] = useState<TextSection | null>(null)
  const [valuePoints, setValuePoints] = useState<ValuePoint[]>([])

  // Fetch text section
  useEffect(() => {
    async function fetchTextSection() {
      try {
        const res = await fetch(`${config.base_url}/text`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setTextSection(data[0] || null)
        } else {
          console.error("Text section API did not return an array:", data)
        }
      } catch (err) {
        console.error("Error fetching text section:", err)
      }
    }
    fetchTextSection()
  }, [])

  // Fetch value points
  useEffect(() => {
    async function fetchValuePoints() {
      try {
        const res = await fetch(`${config.base_url}/featuredImage`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setValuePoints(data)
        } else {
          console.error("Value points API did not return an array:", data)
          setValuePoints([])
        }
      } catch (err) {
        console.error("Error fetching value points:", err)
        setValuePoints([])
      }
    }
    fetchValuePoints()
  }, [])

  console.log("ValuePoints image URLs:")
  valuePoints.forEach((point) => console.log(point.imageUrl))

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef)

      gsap.set(selector('[data-anim="bg-letter"]'), { x: -100, opacity: 0 })
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
      gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })

      // Temporarily set opacity 1 for cards to debug image visibility
      gsap.set(cardsRef.current, { opacity: 1, y: 0 })
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })

      ScrollTrigger.refresh()

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(selector('[data-anim="bg-letter"]'), {
        x: 0,
        opacity: 0.03,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      })
        .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1.0")
        .to(selector('[data-anim="title-line"]'), { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8")
        .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        // Cards animation removed for now because we set opacity 1 initially
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="lg:mt-24 md:mt-20 mt-14 lg:mb-8 w-full overflow-hidden pt-12 md:pt-20"
    >
      {/* Header */}
      <div className="relative mb-16 md:mb-24 max-w-450 mx-auto px-4 sm:px-6 lg:px-12">
        <div className="absolute -top-16 md:-top-24 left-10 w-full overflow-hidden pointer-events-none select-none z-0">
          <h2 className="text-[18vw] font-bold text-slate-900 leading-none tracking-tighter text-left flex">
            {"TRUSTED".split("").map((letter, i) => (
              <span key={i} data-anim="bg-letter" className="inline-block opacity-0">
                {letter}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-20 pt-10">
          <div className="flex-1">
            <div className="flex items-center ml-0 md:ml-4 gap-4 mb-8">
              <span className="w-12 h-px bg-[#E7C873]"></span>
              <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm opacity-0">
                {textSection?.journeyTag?.replace(/-/g, " ").toUpperCase() || "OUR VALUES"}
              </span>
            </div>

            <div className="relative left-0 md:left-4">
              <div className="overflow-hidden">
                <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight leading-[0.9] opacity-0">
                  Why
                </h2>
              </div>
              <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-slate-800 leading-[0.9] opacity-0">
                  <span className="relative inline-block">
                    {textSection?.emphasis || "Choose Us"}
                    <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:max-w-md pb-4">
            <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6 opacity-0">
              {textSection ? (
                <>
                  {textSection.description?.split(" ").map((word, i) => {
                    if (word.toLowerCase().includes("seamless") || word.toLowerCase().includes("rewarding")) {
                      return <span key={i} className="text-[#E7C873] font-medium">{word} </span>
                    }
                    return word + " "
                  })}
                </>
              ) : (
                "Loading description..."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Value Points */}
      <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[90vh] min-h-[700px] gap-4 lg:gap-6">
            {valuePoints.map((point, index) => {
              const verticalLabel = index === 0 ? "Inventory" : index === 1 ? "Transaction" : "Trusted"

              return (
                <div
                  key={point.id}
                  ref={(el) => { cardsRef.current[index] = el }}
                  className="group relative flex-1 w-full lg:w-auto h-[600px] lg:h-auto hover:flex-[3] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer opacity-100"
                >
                  <div className="absolute inset-0 w-full h-full transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out">
                    <Image
                      src={point.imageUrl || "/fallback-image.jpg"}
                      alt={point.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/90 group-hover:from-slate-900/30 group-hover:via-slate-900/50 group-hover:to-slate-900 transition-all duration-700"></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-700 ease-in-out group-hover:-translate-y-20 group-hover:opacity-0">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white/80 tracking-widest uppercase text-center lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap drop-shadow-lg">
                      {verticalLabel}
                    </h3>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end z-30
                    opacity-0 translate-y-12
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-700 ease-out"
                  >
                    <div className="w-16 h-1 bg-[#E7C873] mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left delay-100"></div>

                    <div className="flex items-center gap-4 mb-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-200">
                      <div className="p-3 bg-[#E7C873] rounded-none text-slate-900 shadow-[0_0_20px_rgba(231,200,115,0.4)]">
                        <Image
                          src={point.iconUrl}
                          alt="icon"
                          width={28}
                          height={28}
                          className="invert brightness-0"
                        />
                      </div>
                      <span className="text-[#E7C873] font-mono text-sm tracking-widest uppercase">0{index + 1} — Feature</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-300">
                      {point.title}
                    </h3>

                    <p className="text-slate-300 text-lg max-w-lg leading-relaxed mb-10 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-400">
                      {point.description}
                    </p>

                    <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-500">
                      <button className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-[#E7C873] hover:border-[#E7C873] hover:text-slate-900 transition-all duration-300 uppercase tracking-widest text-xs font-bold">
                        Explore More
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 border-[1px] border-[#E7C873]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-40"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
