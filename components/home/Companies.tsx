"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { companies } from "@/lib/data/companiesData"

gsap.registerPlugin(ScrollTrigger)

export default function Companies() {
    const sectionRef = useRef<HTMLElement>(null)
    const headingRef = useRef<HTMLParagraphElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Slider container animation
            gsap.fromTo(sliderRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Duplicate companies for seamless infinite scroll
    const duplicatedCompanies = [...companies, ...companies, ...companies]

    return (
        <section ref={sectionRef} className="lg:mt-10 md:mt-8 mt-6 py-10 sm:py-16 bg-[#FFF8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <p
                    ref={headingRef}
                    className="text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-12"
                >
                    Thousands of world&apos;s leading companies trust Space
                </p>

                {/* Slider Container */}
                <div
                    ref={sliderRef}
                    className="relative overflow-hidden"
                >
                    {/* Left Gradient Overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#FFF8F6] to-transparent z-10 pointer-events-none" />

                    {/* Right Gradient Overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#FFF8F6] to-transparent z-10 pointer-events-none" />

                    {/* Sliding Track */}
                    <div className="flex animate-slide">
                        {duplicatedCompanies.map((company, index) => (
                            <div
                                key={`${company.name}-${index}`}
                                className="flex-shrink-0 px-6 sm:px-10 py-4 group cursor-pointer"
                            >
                                <div className="relative w-24 sm:w-32 h-8 sm:h-10 grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                .animate-slide {
                    animation: slide 20s linear infinite;
                }
                .animate-slide:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}
