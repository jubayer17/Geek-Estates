"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { heroSlides } from "@/lib/data/heroSlidesData"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const currentSlideRef = useRef(0) // Track current slide in ref for animations
  const progressRef = useRef<HTMLDivElement>(null)

  const AUTOPLAY_DELAY = 4000

  // Premium Slide In Animation
  const animateSlideIn = useCallback((index: number) => {
    const slide = slidesRef.current[index]
    const content = contentRefs.current[index]
    if (!slide || !content) return

    const slideData = heroSlides[index]
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    })

    // Reset slide and content state before animating
    gsap.set(slide, {
      zIndex: 2,
      opacity: 1,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      rotation: 0,
      clipPath: "inset(0% 0% 0% 0%)" // Reset clip-path
    })
    gsap.set(content, { opacity: 1 })

    // Elements to animate
    const image = slide.querySelector(".hero-image")
    const badge = content.querySelector(".hero-badge")
    const headingLines = content.querySelectorAll(".hero-heading-line")
    const subheading = content.querySelector(".hero-subheading")
    const cta = content.querySelector(".hero-cta")

    // --- 1. Unique Image Transitions ---
    switch (slideData.transition) {
      case "slideRight":
        // Slide in from right
        tl.fromTo(slide,
          { xPercent: 100 },
          { xPercent: 0, duration: 1.0, ease: "power4.inOut" },
          0
        )
        tl.fromTo(image,
          { scale: 1.2 },
          { scale: 1, duration: 1.0, ease: "power2.out" },
          0
        )
        break

      case "verticalReveal":
        // Reveal from bottom using clip-path
        tl.fromTo(slide,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power4.inOut" },
          0
        )
        tl.fromTo(image,
          { scale: 1.2, yPercent: -10 },
          { scale: 1, yPercent: 0, duration: 1.0, ease: "power2.out" },
          0
        )
        break

      case "zoomParallax":
        // Deep zoom effect
        tl.fromTo(image,
          { scale: 1.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          0
        )
        break

      case "crossfadeRotate":
        // Subtle rotation with fade
        tl.fromTo(image,
          { scale: 1.3, rotation: 5, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
          0
        )
        break

      case "fadeScale":
      default:
        // Classic fade with scale
        tl.fromTo(image,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          0
        )
        break
    }

    // --- 2. Unique Text Animations ---
    const textStagger = 0.05
    const textDuration = 0.7
    const textDelay = 0.3 // Start text animation after slide transition starts

    // Helper for common elements
    const elements = [badge, ...headingLines, subheading, cta].filter(Boolean)

    switch (slideData.textAnimation) {
      case "dropIn":
        // Drop from top with bounce
        tl.fromTo(elements,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "bounce.out" },
          textDelay
        )
        break

      case "sideConnect":
        // Heading from left, Subheading/CTA from right (Meeting in middle)
        if (badge) tl.fromTo(badge, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out" }, textDelay)

        if (headingLines.length > 0) {
          tl.fromTo(headingLines,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "power3.out" },
            textDelay + 0.1
          )
        }

        if (subheading) {
          tl.fromTo(subheading,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            textDelay + 0.2
          )
        }

        if (cta) {
          tl.fromTo(cta,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            textDelay + 0.3
          )
        }
        break

      case "rotateUp":
        // 3D Rotation from bottom
        tl.fromTo(elements,
          { rotationX: 90, y: 50, opacity: 0, transformOrigin: "50% 100%" },
          { rotationX: 0, y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "power3.out" },
          textDelay
        )
        break

      case "blurReveal":
        // Blur in
        tl.fromTo(elements,
          { filter: "blur(20px)", opacity: 0, scale: 1.1 },
          { filter: "blur(0px)", opacity: 1, scale: 1, stagger: 0.08, duration: 1.0, ease: "power2.out" },
          textDelay
        )
        break

      case "clipReveal":
        // Reveal via clip-path (wipe effect)
        tl.fromTo(elements,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, stagger: 0.08, duration: 0.8, ease: "power4.inOut" },
          textDelay
        )
        break

      default:
        // Fallback: Standard Stagger Up
        tl.fromTo(elements,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "power3.out" },
          textDelay
        )
        break
    }

    return tl
  }, [])

  // Premium Slide Out Animation
  const animateSlideOut = useCallback((index: number) => {
    const slide = slidesRef.current[index]
    const content = contentRefs.current[index]
    if (!slide || !content) return

    const tl = gsap.timeline()

    // Elements
    const contentElements = content.querySelectorAll(".hero-badge, .hero-heading-line, .hero-subheading, .hero-cta")

    // 1. Fade out content quickly
    tl.to(contentElements, { opacity: 0, y: -10, duration: 0.4, stagger: 0.05 })

    // 2. Drop z-index (Image stays visible to be covered by next slide)
    tl.to(slide, { zIndex: 1, duration: 0.1 })

    return tl
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlideRef.current) return

    setIsAnimating(true)
    const previousSlide = currentSlideRef.current
    currentSlideRef.current = index
    setCurrentSlide(index)

    // Restart progress bar
    if (progressRef.current) {
      gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: AUTOPLAY_DELAY / 1000, ease: "none" })
    }

    // Animate
    animateSlideOut(previousSlide)
    const inTl = animateSlideIn(index)

    inTl?.eventCallback("onComplete", () => {
      setIsAnimating(false)
    })
  }, [isAnimating, animateSlideIn, animateSlideOut])

  const goToNext = useCallback(() => {
    const nextIndex = (currentSlideRef.current + 1) % heroSlides.length
    goToSlide(nextIndex)
  }, [goToSlide])

  const goToPrev = useCallback(() => {
    const prevIndex = (currentSlideRef.current - 1 + heroSlides.length) % heroSlides.length
    goToSlide(prevIndex)
  }, [goToSlide])

  // Initial Load
  useEffect(() => {
    // Hide all slides initially except the first one (set invisible for animation)
    slidesRef.current.forEach((slide, i) => {
      if (slide) {
        if (i === 0) {
          gsap.set(slide, { opacity: 1, zIndex: 2 })
          // Set initial state for content to avoid FOUC
          const content = contentRefs.current[0]
          if (content) {
            const elements = content.querySelectorAll(".hero-badge, .hero-heading-line, .hero-subheading, .hero-cta")
            gsap.set(elements, { opacity: 0, y: 20 })
          }
        } else {
          gsap.set(slide, { opacity: 0, zIndex: 1 })
        }
      }
    })

    // Start first slide animation
    const timer = setTimeout(() => animateSlideIn(0), 100)

    // Start progress bar
    if (progressRef.current) {
      gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: AUTOPLAY_DELAY / 1000, ease: "none" })
    }

    return () => clearTimeout(timer)
  }, [animateSlideIn])

  // Autoplay
  useEffect(() => {
    if (isAnimating) return

    autoplayRef.current = setTimeout(() => {
      goToNext()
    }, AUTOPLAY_DELAY)

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
    }
  }, [currentSlide, isAnimating, goToNext])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-black"
      onMouseEnter={() => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }}
      onMouseLeave={() => {
        if (!isAnimating) autoplayRef.current = setTimeout(goToNext, AUTOPLAY_DELAY)
      }}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => { slidesRef.current[index] = el }}
          className={`absolute inset-0 w-full h-full transition-opacity duration-0 ${index === 0 ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
        >
          {/* Image Container with Zoom Effect */}
          <div className="hero-image absolute inset-0 w-full h-full">
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div
            ref={(el) => { contentRefs.current[index] = el }}
            className="relative z-10 h-full flex items-center pt-24 md:pt-44"
          >
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 w-full  md:pt-0">
              <div className="max-w-4xl -mt-32">
                {/* Badge */}
                <div className="hero-badge overflow-hidden mb-4 md:mb-6">
                  <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#E7C873] animate-pulse" />
                    <span className="text-[10px] md:text-sm font-medium tracking-widest uppercase text-white/90">
                      {slide.badge}
                    </span>
                  </div>
                </div>

                {/* Heading - Split for Animation */}
                <div className="mb-4 md:mb-6 overflow-hidden">
                  <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] tracking-tighter flex flex-wrap gap-x-2 md:gap-x-4">
                    {slide.heading.split(" ").map((word, i) => (
                      <span key={i} className="hero-heading-line inline-block font-serif italic">
                        {word}
                      </span>
                    ))}
                  </h1>
                </div>

                {/* Subheading */}
                <p className="hero-subheading text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-xl md:max-w-2xl mb-8 md:mb-10 leading-relaxed font-light">
                  {slide.subheading}
                </p>

                {/* CTA */}
                <div className="hero-cta flex flex-wrap gap-4 md:gap-6">
                  <Button
                    size="lg"
                    className="group rounded-full px-5 py-4 md:px-8 md:py-7 lg:px-10 lg:py-8 text-sm md:text-base font-bold tracking-widest uppercase bg-[#E7C873] hover:bg-[#d9ba5f] text-gray-900 shadow-[0_0_40px_rgba(231,200,115,0.3)] hover:shadow-[0_0_60px_rgba(231,200,115,0.5)] transition-all duration-500"
                  >
                    <span className="relative z-10">{slide.cta}</span>
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-5 py-4 md:px-8 md:py-7 lg:px-10 lg:py-8 text-sm md:text-base font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Premium Navigation Controls */}
      <div className="absolute bottom-8 md:bottom-12 left-0 w-full z-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-row items-end justify-between gap-4">

          {/* Progress & Count */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-white font-mono text-sm md:text-lg">
              <span className="text-[#E7C873]">0{currentSlide + 1}</span>
              <span className="opacity-30 mx-2">/</span>
              <span className="opacity-50">0{heroSlides.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-20 sm:w-32 md:w-48 h-[2px] bg-white/10 relative overflow-hidden">
              <div
                ref={progressRef}
                className="absolute inset-0 bg-[#E7C873] origin-left"
              />
            </div>
          </div>

          {/* Arrows */}
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