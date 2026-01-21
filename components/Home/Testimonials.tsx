"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { testimonials, testimonialStats } from "@/lib/data/testimonialsData"
import TestimonialCard from "../reuseable/TestimonialCard"
import TestimonialStats from "../reuseable/TestimonialStats"

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const navRef = useRef<HTMLDivElement>(null)

    // Entrance animations on scroll
    useEffect(() => {
        const ctx = gsap.context(() => {
            const selector = gsap.utils.selector(sectionRef)

            // Initial States for Header
            gsap.set(selector('[data-anim="header-bg"]'), { yPercent: 10, opacity: 0 })
            gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
            gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
            gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })

            // Header Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            })

            tl.to(selector('[data-anim="header-bg"]'), { yPercent: 0, opacity: 0.05, duration: 1.5, ease: "power2.out" })
                .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "back.out(2)" }, "-=1.2")
                .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "bounce.out" }, "-=1.0")
                .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")

            // Left column animations (Stats)
            gsap.fromTo(statsRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    delay: 0.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Right column - card animation
            gsap.fromTo(cardRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1, x: 0,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Navigation buttons
            gsap.fromTo(navRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    delay: 0.5,
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

    // Animate card transition
    const animateCardTransition = useCallback((direction: "left" | "right") => {
        const xStart = direction === "right" ? 50 : -50

        gsap.fromTo(cardRef.current,
            { opacity: 0, x: xStart },
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
        )
    }, [])

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => {
            const newIndex = prev === 0 ? testimonials.length - 1 : prev - 1
            return newIndex
        })
        animateCardTransition("left")
    }, [animateCardTransition])

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => {
            const newIndex = prev === testimonials.length - 1 ? 0 : prev + 1
            return newIndex
        })
        animateCardTransition("right")
    }, [animateCardTransition])

    // Button hover animations
    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    const currentTestimonial = testimonials[currentIndex]

    return (
        <section ref={sectionRef} className="lg:mt-50 md:mt-30 mt-10 py-10 sm:py-16 bg-[#FFF8F6] w-full overflow-hidden">
            {/* Header Section */}
            <div className="relative mb-16 md:mb-24 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
                {/* Background Big Text */}
                <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                    <h2 data-anim="header-bg" className="text-[18vw] font-bold text-slate-900 leading-none opacity-0 tracking-tighter text-center md:text-left">
                        REVIEWS
                    </h2>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-20 pt-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                            <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Testimonials</span>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden">
                                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-slate-900 tracking-tight leading-[0.9]">
                                    Client
                                </h2>
                            </div>
                            <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-slate-800 leading-[0.9]">
                                    <span className="relative inline-block">
                                        Stories
                                        <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="lg:max-w-md pb-4">
                        <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
                            Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Left Column - Heading & Stats */}
                    <div className="space-y-4">
                        <TestimonialStats
                            ref={statsRef}
                            happyPeople={testimonialStats.happyPeople}
                            overallRating={testimonialStats.overallRating}
                        />
                    </div>

                    {/* Right Column - Testimonial Card */}
                    <div className="space-y-6">
                        <TestimonialCard
                            ref={cardRef}
                            name={currentTestimonial.name}
                            role={currentTestimonial.role}
                            image={currentTestimonial.image}
                            quote={currentTestimonial.quote}
                        />

                        {/* Navigation Buttons */}
                        <div ref={navRef} className="flex gap-3">
                            <button
                                onClick={goToPrevious}
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonLeave}
                                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#1F4B43] hover:bg-[#1F4B43] hover:text-white transition-colors duration-300"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={goToNext}
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonLeave}
                                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#1F4B43] hover:bg-[#1F4B43] hover:text-white transition-colors duration-300"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
