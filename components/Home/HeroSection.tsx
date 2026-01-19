"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

  const AUTOPLAY_DELAY = 6000 // 6 seconds per slide

  // Slide transition animations - each slide has unique entry
  const animateSlideIn = useCallback((index: number) => {
    const slide = slidesRef.current[index]
    const content = contentRefs.current[index]
    if (!slide || !content) return

    const slideData = heroSlides[index]
    const tl = gsap.timeline()

    // Reset slide
    gsap.set(slide, { opacity: 0, scale: 1, x: 0, y: 0, rotation: 0, clipPath: "inset(0% 0% 0% 0%)" })

    // Unique background transitions
    switch (slideData.transition) {
      case "fadeScale":
        tl.fromTo(slide,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
        )
        break

      case "slideRight":
        tl.fromTo(slide,
          { opacity: 0, x: "100%", scale: 1.05 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" }
        )
        break

      case "verticalReveal":
        tl.fromTo(slide,
          { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" }
        )
        break

      case "zoomParallax":
        tl.fromTo(slide,
          { opacity: 0, scale: 1.3 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
        )
        break

      case "crossfadeRotate":
        tl.fromTo(slide,
          { opacity: 0, rotation: 2, scale: 1.05 },
          { opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "power2.out" }
        )
        break

      default:
        tl.to(slide, { opacity: 1, duration: 1 })
    }

    // Content animation after background settles
    const badge = content.querySelector(".hero-badge")
    const heading = content.querySelector(".hero-heading")
    const subheading = content.querySelector(".hero-subheading")
    const cta = content.querySelector(".hero-cta")

    // Reset content - clear all transforms and set opacity to 0
    gsap.set([badge, heading, subheading, cta], {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 1,
      clearProps: "transform"
    })

    // Unique text animations
    switch (slideData.textAnimation) {
      case "staggerUp":
        tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .fromTo(heading, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
          .fromTo(subheading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
          .fromTo(cta, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2")
        break

      case "slideLeft":
        tl.fromTo(badge, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .fromTo(heading, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
          .fromTo(subheading, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
          .fromTo(cta, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        break

      case "fadeStagger":
        tl.fromTo([badge, heading, subheading, cta],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        )
        break

      case "slideRight":
        tl.fromTo(badge, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .fromTo(heading, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
          .fromTo(subheading, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
          .fromTo(cta, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        break

      case "scaleUp":
        tl.fromTo(badge, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.4")
          .fromTo(heading, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
          .fromTo(subheading, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")
          .fromTo(cta, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2")
        break

      default:
        tl.to([badge, heading, subheading, cta], { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.4")
    }

    return tl
  }, [])

  // Slide out animation
  const animateSlideOut = useCallback((index: number) => {
    const slide = slidesRef.current[index]
    const content = contentRefs.current[index]
    if (!slide || !content) return

    const tl = gsap.timeline()

    // Get all content elements
    const badge = content.querySelector(".hero-badge")
    const heading = content.querySelector(".hero-heading")
    const subheading = content.querySelector(".hero-subheading")
    const cta = content.querySelector(".hero-cta")

    // Fade out content first
    tl.to([badge, heading, subheading, cta], { opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(slide, { opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.2")

    return tl
  }, [])

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlideRef.current) return

    setIsAnimating(true)
    const previousSlide = currentSlideRef.current

    // Animate out current slide
    const outTl = animateSlideOut(previousSlide)

    // After out animation, animate in new slide
    outTl?.eventCallback("onComplete", () => {
      currentSlideRef.current = index
      setCurrentSlide(index)
      const inTl = animateSlideIn(index)
      inTl?.eventCallback("onComplete", () => {
        setIsAnimating(false)
      })
    })
  }, [isAnimating, animateSlideIn, animateSlideOut])

  // Navigation functions
  const goToNext = useCallback(() => {
    const nextIndex = (currentSlideRef.current + 1) % heroSlides.length
    goToSlide(nextIndex)
  }, [goToSlide])

  const goToPrev = useCallback(() => {
    const prevIndex = (currentSlideRef.current - 1 + heroSlides.length) % heroSlides.length
    goToSlide(prevIndex)
  }, [goToSlide])

  // Initial animation
  useEffect(() => {
    // Set all slides to invisible initially except first
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, { opacity: index === 0 ? 0 : 0 })
      }
    })

    // Animate first slide in after a short delay
    const timer = setTimeout(() => {
      animateSlideIn(0)
    }, 300)

    return () => clearTimeout(timer)
  }, [animateSlideIn])

  // Autoplay - use timeout instead of interval to ensure proper sequencing
  useEffect(() => {
    if (isAnimating) return // Don't start new timer while animating

    autoplayRef.current = setTimeout(() => {
      goToNext()
    }, AUTOPLAY_DELAY)

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current)
      }
    }
  }, [currentSlide, isAnimating, goToNext])

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
    }
    autoplayRef.current = setTimeout(() => {
      if (!isAnimating) {
        goToNext()
      }
    }, AUTOPLAY_DELAY)
  }

  // Button hover animations
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh md:min-h-screen w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => { slidesRef.current[index] = el }}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: currentSlide === index ? 2 : 1 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
          </div>

          {/* Content */}
          <div
            ref={(el) => { contentRefs.current[index] = el }}
            className="relative z-10 h-full flex items-center"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="hero-badge">
                  <Badge
                    variant="outline"
                    className="mb-4 md:mb-6 rounded-full px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm border-white/50 text-white bg-white/10 backdrop-blur-sm"
                  >
                    {slide.badge}
                  </Badge>
                </div>

                {/* Heading */}
                <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6">
                  {slide.heading}
                </h1>

                {/* Subheading */}
                <p className="hero-subheading text-base sm:text-lg md:text-xl text-white/90 max-w-xl mb-6 md:mb-8 leading-relaxed">
                  {slide.subheading}
                </p>

                {/* CTA Button */}
                <div className="hero-cta">
                  <Button
                    size="lg"
                    className="rounded-full px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-base font-semibold bg-[#E7C873] hover:bg-[#d4b665] text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 sm:left-6 lg:left-8 z-20">
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute bottom-1/2 translate-y-1/2 right-4 sm:right-6 lg:right-8 z-20">
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index
                ? "w-10 sm:w-12 bg-[#E7C873]"
                : "w-3 sm:w-4 bg-white/40 group-hover:bg-white/60"
                }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-[#E7C873] transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`
          }}
        />
      </div>
    </section>
  )
}
