"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Home } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { howItWorksSteps, howItWorksImages, howItWorksStats } from '@/lib/data/howItWorksData'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null)
    const imageGridRef = useRef<HTMLDivElement>(null)
    const topImageRef = useRef<HTMLDivElement>(null)
    const bottomLeftRef = useRef<HTMLDivElement>(null)
    const bottomRightRef = useRef<HTMLDivElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const stepsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image animations
            gsap.fromTo(topImageRef.current,
                { opacity: 0, y: -50, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageGridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            gsap.fromTo(bottomLeftRef.current,
                { opacity: 0, x: -50, scale: 0.9 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageGridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            gsap.fromTo(bottomRightRef.current,
                { opacity: 0, x: 50, scale: 0.9 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageGridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Badge pop-in animation
            gsap.fromTo(badgeRef.current,
                { opacity: 0, scale: 0, rotate: -10 },
                {
                    opacity: 1, scale: 1, rotate: 0,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: imageGridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Content animations
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Steps stagger animation
            const stepItems = stepsRef.current?.children
            if (stepItems) {
                gsap.fromTo(stepItems,
                    { opacity: 0, x: 30 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: stepsRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="lg:mt-50 md:mt-30 mt-10 py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Column - Image Grid */}
                    <div ref={imageGridRef} className="relative w-full">
                        {/* Grid Container */}
                        <div className="grid grid-cols-12 gap-4">
                            {/* Top Wide Image - spans full width, positioned right */}
                            <div ref={topImageRef} className="col-span-12 flex justify-end">
                                <div className="relative w-[75%] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src={howItWorksImages[0].src}
                                        alt={howItWorksImages[0].alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Bottom Row - Two images side by side */}
                            <div className="col-span-12 grid grid-cols-12 gap-4 mt-2">
                                {/* Bottom Left - Small Image */}
                                <div ref={bottomLeftRef} className="col-span-5">
                                    <div className="relative h-[220px] sm:h-[280px] rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src={howItWorksImages[1].src}
                                            alt={howItWorksImages[1].alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Bottom Right - Large Image */}
                                <div ref={bottomRightRef} className="col-span-7">
                                    <div className="relative h-[280px] sm:h-[350px] rounded-2xl overflow-hidden shadow-xl">
                                        <Image
                                            src={howItWorksImages[2].src}
                                            alt={howItWorksImages[2].alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div
                            ref={badgeRef}
                            className="absolute top-[38%] left-[28%] sm:left-[32%] bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 z-10"
                        >
                            <div className="w-10 h-10 bg-[#1F4B43] rounded-full flex items-center justify-center">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{howItWorksStats.label}</p>
                                <p className="text-lg font-bold text-gray-900">{howItWorksStats.value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="space-y-8">
                        {/* Heading */}
                        <div ref={contentRef}>
                            <span className="text-[#E7C873] font-medium text-sm uppercase tracking-wider">
                                How It Works
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-2 leading-tight">
                                Find a Perfect Home
                            </h2>
                            <p className="text-gray-600 mt-4 text-base sm:text-lg">
                                We help you find your dream home with a simple and easy process. Follow these three steps to get started.
                            </p>
                        </div>

                        {/* Steps */}
                        <div ref={stepsRef} className="space-y-6">
                            {howItWorksSteps.map((step, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#FFF8F6] rounded-full flex items-center justify-center">
                                        <step.icon className="w-6 h-6 text-[#1F4B43]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
