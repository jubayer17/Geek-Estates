"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const locations = [
  "The Villages, FL real estate",
  "New York, Real estate",
  "Madera, CA real estate",
  "Fontana, CA real estate",
  "Moreno Valley, CA real estate",
  "Aurora, IL real estate",
  "Perris, CA real estate",
  "Minnesota Lake, MN real estate",
  "Woodbridge, VA real estate",
];

function PopularRealEstateTag({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      {text}
    </div>
  );
}

export default function PopularRealEstate() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef)

      // Initial States
      gsap.set(selector('[data-anim="header-bg"]'), { yPercent: 10, opacity: 0 })
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, rotation: -5 })
      gsap.set(selector('[data-anim="title-line"]'), { scale: 1.1, opacity: 0 })
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 30 })
      gsap.set(tagsRef.current, { opacity: 0, y: 40 })

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })

      // Unique Vibe: Circ easing, scaling title
      tl.to(selector('[data-anim="header-bg"]'), { yPercent: 0, opacity: 0.03, duration: 1.5, ease: "power2.out" })
        .to(selector('[data-anim="badge"]'), { opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=1.2")
        .to(selector('[data-anim="title-line"]'), { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1, ease: "circ.out" }, "-=1.0")
        .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
        .to(tagsRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Header Section */}
      <div className="relative mb-16 md:mb-24 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Background Big Text */}
        <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
          <h2 data-anim="header-bg" className="text-[18vw] font-bold text-slate-900 leading-none opacity-0 tracking-tighter text-center md:text-left">
            TRENDING
          </h2>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-20 pt-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#E7C873]"></span>
              <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Hot Markets</span>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-slate-900 tracking-tight leading-[0.9]">
                  Popular
                </h2>
              </div>
              <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-slate-800 leading-[0.9]">
                  <span className="relative inline-block">
                    Markets
                    <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:max-w-md pb-4">
            <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
              Discover the most sought-after locations where real estate is booming and opportunities await.
            </p>
          </div>
        </div>
      </div>

      <div ref={tagsRef} className="max-w-6xl mx-auto mt-8 relative z-10">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {locations.map((location, index) => (
            <PopularRealEstateTag
              key={index}
              text={location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
