"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TitleSubtitle from "../reuseable/TitleSubtitle"
import CarouselAndCard from "./CarouselAndCard"

gsap.registerPlugin(ScrollTrigger)

export default function FindProperties() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Carousel animation
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="lg:mt-32 md:mt-20 mt-12 bg-[#F7F7F7] py-10 sm:py-14 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef}>
          <TitleSubtitle
            title="Find Properties in These Cities"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
        <div ref={carouselRef} className="mt-6 sm:mt-8">
          <CarouselAndCard />
        </div>
      </div>
    </section>
  )
}
