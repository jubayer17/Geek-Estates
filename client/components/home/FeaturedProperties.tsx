"use client"

import React, { useEffect, useRef } from 'react'
import FeaturedTabs from './FeaturedTabs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef)

      // Initial States
      gsap.set(selector('[data-anim="header-bg"]'), { yPercent: 10, opacity: 0 })
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, scale: 0.8 })
      gsap.set(selector('[data-anim="title-line"]'), { x: -50, opacity: 0 })
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, x: 50 })

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })

      // Unique Vibe: Expo easing, side entrances
      tl.to(selector('[data-anim="header-bg"]'), { yPercent: 0, opacity: 0.03, duration: 1.5, ease: "power2.out" })
        .to(selector('[data-anim="badge"]'), { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=1.2")
        .to(selector('[data-anim="title-line"]'), { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" }, "-=1.0")
        .to(selector('[data-anim="desc"]'), { opacity: 1, x: 0, duration: 1, ease: "expo.out" }, "-=0.8")

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='py-20 md:py-32 relative overflow-hidden'>
      {/* Header Section */}
      <div className="relative mb-16 md:mb-24 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Background Big Text */}
        <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
          <h2 data-anim="header-bg" className="text-[18vw] font-bold text-slate-900 leading-none opacity-0 tracking-tighter text-center md:text-left">
            EXCLUSIVE
          </h2>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-20 pt-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#E7C873]"></span>
              <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Collection</span>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight leading-[0.9]">
                  Featured
                </h2>
              </div>
              <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-slate-800 leading-[0.9]">
                  <span className="relative inline-block">
                    Properties
                    <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:max-w-md pb-4">
            <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
              Explore our handpicked selection of premium real estate opportunities designed for modern living.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedTabs />
      </div>
    </section>
  )
}
