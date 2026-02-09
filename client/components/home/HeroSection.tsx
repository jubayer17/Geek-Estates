"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import gsap from "gsap"

interface HeroBanner {
  id: string
  badgeText: string
  title: string
  subtitle: string
  imageUrl: string | null
  isActive: boolean
  buttonText1: string
  buttonText2: string
}

export default function HeroSection() {
  const [banners, setBanners] = useState<HeroBanner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const AUTOPLAY_DELAY = 4000

  // ----------------------
  // Fetch Hero Banners
  // ----------------------
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("http://localhost:5000/heroBanner")
        const data = await res.json()
        if (data.success && Array.isArray(data.data)) {
          setBanners(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch hero banners:", error)
      }
    }

    fetchBanners()
  }, [])

  // ----------------------
  // Slide In Animation
  // ----------------------
  const animateSlideIn = useCallback((index: number) => {
    const slide = slidesRef.current[index]
    const content = contentRefs.current[index]
    if (!slide || !content) return

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    gsap.set(slide, { opacity: 1, zIndex: 2 })
    gsap.set(content, { opacity: 1 })

    const image = slide.querySelector(".hero-image")
    const badge = content.querySelector(".hero-badge")
    const headingLines = content.querySelectorAll(".hero-heading-line")
    const subheading = content.querySelector(".hero-subheading")
    const cta = content.querySelector(".hero-cta")

    // Image fade-in with scale
    tl.fromTo(
      image,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 }
    )

    // Text stagger
    const elements = [badge, ...headingLines, subheading, cta].filter(Boolean)
    tl.fromTo(
      elements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.7 },
      0.3
    )

    return tl
  }, [])

  // ----------------------
  // Slide Out Animation
  // ----------------------
  const animateSlideOut = useCallback((index: number) => {
    const slide = slidesRef.current[index]
    const content = contentRefs.current[index]
    if (!slide || !content) return

    const tl = gsap.timeline()
    const elements = content.querySelectorAll(
      ".hero-badge, .hero-heading-line, .hero-subheading, .hero-cta"
    )

    tl.to(elements, { opacity: 0, y: -10, duration: 0.4, stagger: 0.05 })
    tl.to(slide, { zIndex: 1, duration: 0.1 })

    return tl
  }, [])

  // ----------------------
  // Go To Slide
  // ----------------------
  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return

      setIsAnimating(true)
      const prev = currentSlide
      setCurrentSlide(index)

      animateSlideOut(prev)
      const tl = animateSlideIn(index)
      tl?.eventCallback("onComplete", () => setIsAnimating(false))

      // Reset progress bar
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: AUTOPLAY_DELAY / 1000, ease: "none" }
        )
      }
    },
    [currentSlide, isAnimating, animateSlideIn, animateSlideOut]
  )

  const goToNext = useCallback(() => {
    if (!banners.length) return
    const next = (currentSlide + 1) % banners.length
    goToSlide(next)
  }, [currentSlide, banners.length, goToSlide])

  const goToPrev = useCallback(() => {
    if (!banners.length) return
    const prev = (currentSlide - 1 + banners.length) % banners.length
    goToSlide(prev)
  }, [currentSlide, banners.length, goToSlide])

  // ----------------------
  // Autoplay
  // ----------------------
  useEffect(() => {
    if (!banners.length) return

    autoplayRef.current = setTimeout(goToNext, AUTOPLAY_DELAY)
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
    }
  }, [currentSlide, banners.length, goToNext])

  // ----------------------
  // Initial Animation
  // ----------------------
  useEffect(() => {
    if (!banners.length) return
    // Hide all slides except first
    slidesRef.current.forEach((slide, i) => {
      if (slide) gsap.set(slide, { opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 })
    })
    animateSlideIn(0)
  }, [banners, animateSlideIn])

  // ----------------------
  // Render
  // ----------------------
  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden bg-black"
      onMouseEnter={() => {
        if (autoplayRef.current) clearTimeout(autoplayRef.current)
      }}
      onMouseLeave={() => {
        if (!isAnimating) autoplayRef.current = setTimeout(goToNext, AUTOPLAY_DELAY)
      }}
    >
      {banners.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => { slidesRef.current[index] = el }} // ✅ Type-safe
          className={`absolute inset-0 w-full h-full transition-opacity duration-0 ${
            index === 0 ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Image */}
          <div className="hero-image absolute inset-0 w-full h-full">
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div
            ref={(el) => { contentRefs.current[index] = el }} // ✅ Type-safe
            className="relative z-10 h-full flex items-center pt-24 md:pt-44"
          >
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
              <div className="max-w-4xl -mt-32">
                <div className="hero-badge overflow-hidden mb-4 md:mb-6">
                  <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#E7C873] animate-pulse" />
                    <span className="text-[10px] md:text-sm font-medium tracking-widest uppercase text-white/90">
                      {slide.badgeText}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] tracking-tighter flex flex-wrap gap-x-2 md:gap-x-4 mb-4 md:mb-6">
                  {slide.title.split(" ").map((word, i) => (
                    <span key={i} className="hero-heading-line inline-block font-serif italic">
                      {word}
                    </span>
                  ))}
                </h1>

                <p className="hero-subheading text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-xl md:max-w-2xl mb-8 md:mb-10 leading-relaxed font-light">
                  {slide.subtitle}
                </p>

                <div className="hero-cta flex flex-wrap gap-4 md:gap-6 mb-10 md:mb-14">
                  <Button
                    size="lg"
                    className="group rounded-full px-5 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 text-xs md:text-base font-bold tracking-widest uppercase bg-[#E7C873] hover:bg-[#d9ba5f] text-gray-900 shadow-[0_0_40px_rgba(231,200,115,0.3)] hover:shadow-[0_0_60px_rgba(231,200,115,0.5)] transition-all duration-500"
                  >
                    <span className="relative z-10">{slide.buttonText1}</span>
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-5 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 text-xs md:text-base font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg"
                  >
                    {slide.buttonText2}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-0 w-full z-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto flex items-end justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-white font-mono text-sm md:text-lg">
              <span className="text-[#E7C873]">0{currentSlide + 1}</span>
              <span className="opacity-30 mx-2">/</span>
              <span className="opacity-50">0{banners.length}</span>
            </div>

            <div className="w-20 sm:w-32 md:w-48 h-[2px] bg-white/10 relative overflow-hidden">
              <div ref={progressRef} className="absolute inset-0 bg-[#E7C873] origin-left" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={goToPrev}
              disabled={isAnimating}
              className="group w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="group w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
