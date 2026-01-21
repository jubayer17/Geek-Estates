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
        <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-900 py-24 md:py-32 overflow-hidden">

            {/* Background Abstract Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-900/30 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
            </div>

            {/* Standard Container - Matching Reviews.tsx & WhyWithUs.tsx */}
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="relative mb-24 md:mb-40">
                    {/* Big Background Text */}
                    <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                        <h2 className="text-[18vw] font-bold text-white leading-none tracking-tighter text-left flex">
                            {"IMPACT".split("").map((letter, i) => (
                                <span key={i} data-anim="bg-letter" className="inline-block opacity-0">
                                    {letter}
                                </span>
                            ))}
                        </h2>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8 pt-24 md:pt-32">
                        <div>
                            <div className="flex items-center gap-4 mb-6 stats-header-item">
                                <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                                <span className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Our Legacy</span>
                            </div>
                            <h2 className="stats-header-item text-6xl sm:text-7xl md:text-8xl font-light text-white tracking-tight leading-[1.1]">
                                Defining <span className="font-serif italic text-[#E7C873]">Architectural Excellence</span>
                            </h2>
                        </div>
                        <p className="stats-header-item text-white/50 max-w-md text-lg leading-relaxed text-right hidden md:block">
                            Building trust through numbers. Every digit represents a milestone in our journey of architectural innovation.
                        </p>
                    </div>
                </div>

                {/* Staircase Content Container */}
                <div ref={containerRef} className="flex flex-col relative w-full pb-10">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.id}
                            ref={el => { cardsRef.current[i] = el }}
                            // Width & Layout Logic:
                            // - Base width: 82% to allow for significant staircase stepping
                            // - Height: min-h-[140px] mobile, md:min-h-[180px] desktop
                            // - Margins: Large staggered left margins (6%, 12%, 18%) for clear stairs
                            className={`
                                relative w-full md:w-[82%]
                                min-h-[140px] md:min-h-[180px] p-6 md:px-12 md:py-14
                                border border-white/10
                                bg-gradient-to-r from-white/[0.03] to-transparent
                                backdrop-blur-[2px] shadow-2xl
                                hover:from-white/[0.06] hover:border-[#E7C873]/50
                                transition-all duration-500 group
                                flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12
                                ${i !== 0 ? 'mt-8 md:-mt-8' : ''}
                                ${i === 0 ? 'md:ml-0 z-40' : ''}
                                ${i === 1 ? 'md:ml-[6%] z-30' : ''}
                                ${i === 2 ? 'md:ml-[12%] z-20' : ''}
                                ${i === 3 ? 'md:ml-[18%] z-10' : ''}
                            `}
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
