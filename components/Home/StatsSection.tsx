"use client"

import React, { useEffect, useRef } from "react"
import { ArrowUpRight, Award, Building, Users, Home as HomeIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
    {
        id: "01",
        value: "28",
        suffix: "+",
        label: "Years of Experience",
        description: "Defining the skyline with over two decades of architectural excellence.",
        icon: Award
    },
    {
        id: "02",
        value: "235",
        suffix: "+",
        label: "Projects Completed",
        description: "Turning dreams into reality with premium residential and commercial spaces.",
        icon: Building
    },
    {
        id: "03",
        value: "4500",
        suffix: "+",
        label: "Units Delivered",
        description: "Creating homes for thousands of families with unmatched quality.",
        icon: HomeIcon
    },
    {
        id: "04",
        value: "1300",
        suffix: "+",
        label: "Plots Handed Over",
        description: "Securing your future with the finest land banks.",
        icon: Users
    }
]

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const selector = gsap.utils.selector(sectionRef)

            // 1. Background Big Text Animation
            gsap.set(selector('[data-anim="bg-letter"]'), {
                opacity: 0,
                x: -50,
                rotateY: 90
            })
            gsap.to(selector('[data-anim="bg-letter"]'), {
                opacity: 0.03, // Keep it subtle
                x: 0,
                rotateY: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            })

            // 2. Header Content Animation
            gsap.from(".stats-header-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%"
                }
            })

            // 3. Staircase Cards Animation
            cardsRef.current.forEach((card, index) => {
                if (!card) return

                // Slide in animation with Alternating Direction (Left / Right)
                const isEven = index % 2 === 0

                gsap.fromTo(card,
                    {
                        x: isEven ? -100 : 100, // Reduced distance for stability
                        opacity: 0,
                        filter: "blur(8px)", // Slightly reduced blur to ease rendering
                        willChange: "transform, opacity, filter" // Optimize performance
                    },
                    {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2, // Faster duration to prevent "hanging" at the end
                        ease: "power3.out", // Smoother tail than power4 (prevents snap effect)
                        force3D: true, // Force GPU acceleration
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 50%",
                            toggleActions: "play none none reverse"
                        }
                    }
                )

                // Number Counter
                const numberEl = card.querySelector('.stat-number')
                const targetValue = stats[index].value

                if (numberEl) {
                    gsap.fromTo(numberEl,
                        { innerText: 0 },
                        {
                            innerText: targetValue,
                            duration: 2.5,
                            ease: "power2.out",
                            snap: { innerText: 1 },
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%"
                            },
                            onUpdate: function () {
                                if (numberEl) {
                                    numberEl.textContent = Math.ceil(Number(this.targets()[0].innerText)).toString()
                                }
                            }
                        }
                    )
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-900"
        >
            {/* Background Big Text */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex items-start justify-center">
                <h2 className="text-[12vw] md:text-[14vw] font-black text-white/5 leading-none whitespace-nowrap pt-10">
                    MILESTONES
                </h2>
            </div>

            {/* Content Container */}
            <div ref={containerRef} className="relative z-10 max-w-[1920px] mx-auto px-4 lg:px-4">
                {/* Header */}
                <div className="mb-20 md:mb-32 max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-20">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-8 stats-header-item">
                                <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                                <span className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Our Journey</span>
                            </div>

                            <div className="relative stats-header-item">
                                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]">
                                    Legacy of
                                </h2>
                                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-white/90 leading-[0.9] mt-2 md:ml-24">
                                    <span className="relative inline-block">
                                        Trust
                                        <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                                    </span>
                                </h2>
                            </div>
                        </div>

                        <div className="lg:max-w-md pb-4 stats-header-item">
                            <p className="text-white/60 text-lg leading-relaxed border-l border-white/10 pl-6">
                                Building the future with precision, passion, and a commitment to excellence. We don&apos;t just build structures; we create landmarks that stand the test of time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Staircase Cards */}
                <div className="flex flex-col w-full gap-y-8 md:gap-y-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            ref={el => { cardsRef.current[index] = el }}
                            className="relative w-full md:w-[99%] lg:w-[99%] mx-auto h-auto md:h-[150px] bg-white/5 backdrop-blur-md border-l-4 border-[#E7C873] group hover:bg-white/10 transition-colors duration-500"
                            style={{
                                marginLeft: index % 2 === 0 ? '0' : '5%', // Much more pronounced stagger for desktop
                                marginRight: index % 2 !== 0 ? '0' : '5%',
                            }}
                        >
                            {/* Inner Content */}
                            <div className="flex items-center gap-6 md:gap-10 w-full">
                                {/* ID */}
                                <span className="font-mono text-[#E7C873] text-lg tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                                    / {stat.id}
                                </span>

                                {/* Number & Label */}
                                <div className="flex-1 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                    <div className="flex items-baseline">
                                        <span className="stat-number text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                                            {stat.value}
                                        </span>
                                        <span className="text-2xl md:text-4xl font-serif italic text-[#E7C873] ml-1">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <h3 className="text-sm md:text-base font-medium text-white/70 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                                        {stat.label}
                                    </h3>
                                </div>

                                {/* Divider (Desktop) */}
                                <div className="hidden md:block w-px h-12 bg-white/10 group-hover:bg-[#E7C873]/30 transition-colors"></div>

                                {/* Description (Desktop) */}
                                <p className="hidden md:block text-white/40 text-sm leading-relaxed max-w-xs group-hover:text-white/60 transition-colors">
                                    {stat.description}
                                </p>

                                {/* Action Icon */}
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E7C873] group-hover:border-[#E7C873] group-hover:text-black transition-all duration-500 shrink-0">
                                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-black transition-colors" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
