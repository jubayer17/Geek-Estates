"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import HomeIcon from "../../public/HomeIcon.webp"
import SecondHome from "../../public/secondHome.webp"
import ThirdIcon from "../../public/thirdIcon.webp"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const valuePoints = [
  {
    icon: HomeIcon,
    title: "Wide Range of Properties",
    description: "We offer expert legal help for all related property items in Dubai."
  },
  {
    icon: SecondHome,
    title: "Buy or Rent Homes",
    description: "We sell your home at the best market price and very quickly as well."
  },
  {
    icon: ThirdIcon,
    title: "Trusted by Thousands",
    description: "We offer you free consultancy to get a loan for your new home."
  }
]

export default function WhyWithUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef)

      // Initial States - Prevent FOUC (Flash of Unstyled Content)
      // Set opacity: 0 immediately via CSS class or inline style in render would be even better, 
      // but GSAP set here should be fast enough if this runs early.
      gsap.set(selector('[data-anim="bg-letter"]'), { x: -100, opacity: 0 })
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
      gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })
      gsap.set(cardsRef.current, { opacity: 0, y: 100 })
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })

      // Force a layout recalculation to ensure initial states are applied before animation starts
      // This is sometimes needed with ScrollTrigger to prevent jumps
      ScrollTrigger.refresh()

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(selector('[data-anim="bg-letter"]'), { x: 0, opacity: 0.03, duration: 1.2, stagger: 0.1, ease: "power3.out" })
        .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1.0")
        .to(selector('[data-anim="title-line"]'), { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8")
        .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(cardsRef.current, { opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: "power4.out" }, "-=0.6")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='lg:mt-24 md:mt-20 mt-14 lg:mb-8 w-full overflow-hidden pt-12 md:pt-20'
    >
      {/* Header Section */}
      <div className="relative mb-16 md:mb-24 max-w-450 mx-auto px-4 sm:px-6 lg:px-12">
        {/* Background Big Text */}
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
              <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm opacity-0">Our Values</span>
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
                    Choose Us
                    <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:max-w-md pb-4">
            <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6 opacity-0">
              Discover the difference of working with a team dedicated to making your real estate journey <span className="text-[#E7C873] font-medium">seamless and rewarding</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Unique 'Cinematic Lens' Accordion Structure */}
      <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1800px] mx-auto">
          {/* The Stage */}
          <div className="flex flex-col lg:flex-row h-auto lg:h-[90vh] min-h-[700px] gap-4 lg:gap-6">

            {valuePoints.map((point, index) => {
              // Define meaningful vertical labels based on the index/content
              const verticalLabel = index === 0 ? "Inventory" : index === 1 ? "Transaction" : "Trusted";

              return (
                <div
                  key={index}
                  ref={(el) => { cardsRef.current[index] = el }}
                  className="group relative flex-1 w-full lg:w-auto h-[600px] lg:h-auto hover:flex-[3] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer opacity-0"
                >
                  {/* Background Image (Parallax Effect on Hover) */}
                  <div className="absolute inset-0 w-full h-full transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out">
                    <Image
                      src={`/outdoor-real-state/${index + 1}.webp`}
                      alt={point.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    {/* Gradient Overlay - Darker on hover for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/90 group-hover:from-slate-900/30 group-hover:via-slate-900/50 group-hover:to-slate-900 transition-all duration-700"></div>
                  </div>

                  {/* Cover Text (Collapsed State) - Responsive: Horizontal on Mobile, Vertical on Desktop */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-700 ease-in-out group-hover:-translate-y-20 group-hover:opacity-0">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white/80 tracking-widest uppercase 
                      text-center lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap drop-shadow-lg">
                      {verticalLabel}
                    </h3>
                  </div>

                  {/* Expanded Content (Active State) - Unified Interaction for Mobile & Desktop */}
                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end z-30
                    opacity-0 translate-y-12
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-700 ease-out"
                  >
                    {/* Decorative Line */}
                    <div className="w-16 h-1 bg-[#E7C873] mb-6 
                      transform scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-700 ease-out origin-left delay-100"
                    ></div>

                    <div className="flex items-center gap-4 mb-6
                      opacity-0 translate-y-8
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-700 ease-out delay-200"
                    >
                      <div className="p-3 bg-[#E7C873] rounded-none text-slate-900 shadow-[0_0_20px_rgba(231,200,115,0.4)]">
                        <Image
                          src={point.icon}
                          alt="icon"
                          width={28}
                          height={28}
                          className="invert brightness-0"
                        />
                      </div>
                      <span className="text-[#E7C873] font-mono text-sm tracking-widest uppercase">0{index + 1} — Feature</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight
                      opacity-0 translate-y-8
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-700 ease-out delay-300"
                    >
                      {point.title}
                    </h3>

                    <p className="text-slate-300 text-lg max-w-lg leading-relaxed mb-10
                      opacity-0 translate-y-8 
                      group-hover:opacity-100 group-hover:translate-y-0 
                      transition-all duration-700 ease-out delay-400"
                    >
                      {point.description}
                    </p>

                    <div className="
                      opacity-0 translate-y-8
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-700 ease-out delay-500"
                    >
                      <button className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-[#E7C873] hover:border-[#E7C873] hover:text-slate-900 transition-all duration-300 uppercase tracking-widest text-xs font-bold">
                        Explore More
                      </button>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
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
