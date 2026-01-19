"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import HomeIcon from "../../public/HomeIcon.png"
import SecondHome from "../../public/secondHome.png"
import ThirdIcon from "../../public/thirdIcon.png"
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
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<(HTMLSpanElement)>(null);

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subtitle = subtitleRef.current
    const cards = cardsRef.current.filter(Boolean)
    const cta = ctaRef.current
    const label = labelRef.current

    if (!section || !heading || !subtitle) return

    if (label) {
      gsap.set(label, { opacity: 0, y: 20, scale: 0.95 })
    }
    gsap.set(heading, { opacity: 0, y: 50, filter: 'blur(8px)' })
    gsap.set(subtitle, { opacity: 0, y: 30 })
    gsap.set(cards, { opacity: 0, y: 50 })
    gsap.set(cta, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      }
    })

    if (label) {
      tl.to(label, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      });
    }
    tl
      .to(heading, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out'
      }, label ? '-=0.4' : '+=0')
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.7')
      .to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.13,
        ease: 'power2.out'
      }, '-=0.5')
      .to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2')

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className='lg:mt-24 md:mt-20 mt-14 lg:mb-8 max-w-550'
    >
      {/* Header Section */}
      <div className='flex flex-col py-1 items-center max-w-2xl mx-auto px-4 lg:px-12'>
        {/* Golden label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-[#E7C873]"></span>
          <span ref={labelRef} className="text-[#E7C873] text-xs font-semibold tracking-[0.25em] uppercase">Why Us</span>
          <span className="h-px w-8 bg-linear-to-l from-transparent to-[#E7C873]"></span>
        </div>
        <h2
          ref={headingRef}
          className="lg:text-4xl md:text-3xl text-2xl font-light text-center text-gray-900 tracking-tight mb-4 md:mb-6 drop-shadow-lg"
          style={{ filter: 'blur(0px)' }}
        >
          Why You Should <span className="font-semibold bg-linear-to-r from-[#E7C873] via-gray-900 to-[#E7C873] bg-clip-text text-transparent">Work With Us</span>
        </h2>
        <p
          ref={subtitleRef}
          className="mt-4 text-base md:text-lg text-gray-500 text-center leading-relaxed max-w-xl"
        >
          Discover the difference of working with a team dedicated to making your real estate journey <span className="text-[#E7C873] font-medium">seamless and rewarding</span>.
        </p>
      </div>

      {/* Value Points Grid */}
      <div className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

            {valuePoints.map((point, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el }}
                className="flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-[#E7C873]/20 bg-white/90 shadow-md hover:shadow-xl hover:scale-[1.035] transition-all duration-500 hover:border-[#E7C873] group"
                style={{ willChange: 'transform, box-shadow' }}
              >
                {/* Icon Container */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-[#E7C873]/10 rounded-full border border-[#E7C873]/20 group-hover:shadow-lg group-hover:bg-[#E7C873]/20 transition-all duration-500">
                  <Image
                    src={point.icon}
                    alt={`${point.title} Icon`}
                    width={28}
                    height={28}
                    className="opacity-90"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xs">
                  {point.description}
                </p>
              </div>
            ))}

          </div>

          {/* Subtle CTA */}
          <div
            ref={ctaRef}
            className="flex justify-center mt-12 lg:mt-16"
          >
            <button className="group inline-flex items-center gap-2 text-[#E7C873] hover:text-gray-900 font-medium text-base transition-colors duration-400 bg-[#E7C873]/10 px-6 py-2 rounded-full shadow hover:shadow-lg">
              <span>Learn more about our approach</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
