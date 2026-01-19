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
    const headingRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const navRef = useRef<HTMLDivElement>(null)

    // Entrance animations on scroll
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left column animations
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            gsap.fromTo(subtitleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

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
        <section ref={sectionRef} className="lg:mt-50 md:mt-30 mt-10 py-10 sm:py-16 bg-[#FFF8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Left Column - Heading & Stats */}
                    <div className="space-y-4">
                        <h2
                            ref={headingRef}
                            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight"
                        >
                            What our customers are saying us?
                        </h2>

                        <p
                            ref={subtitleRef}
                            className="text-gray-600 text-base sm:text-lg max-w-md"
                        >
                            Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
                        </p>

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
