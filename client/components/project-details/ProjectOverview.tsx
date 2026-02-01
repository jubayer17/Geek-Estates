"use client"

import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProjectOverviewProps {
    stats: { label: string; value: string }[]
    description?: string
    address?: string
    details?: { label: string; value: string }[]
    image?: string
}

export default function ProjectOverview({ stats, image = "/slide2.webp" }: ProjectOverviewProps) {
    const containerRef = useRef<HTMLElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Image Parallax & Reveal
            // Initial state
            gsap.set(imageContainerRef.current, {
                clipPath: "inset(100% 0 0 0)",
                scale: 1.1
            })

            // Animation
            gsap.to(imageContainerRef.current, {
                clipPath: "inset(0% 0 0 0)",
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            })

            // Parallax effect (separate trigger for continuous movement)
            gsap.to(imageRef.current, {
                scale: 1.15,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            })

            // 2. Stats Animation (Unique Stagger + Count every time)
            const statItems = gsap.utils.toArray<HTMLElement>(".stat-item")

            statItems.forEach((item, i) => {
                const valueEl = item.querySelector(".stat-value") as HTMLElement
                const lineEl = item.querySelector(".stat-line") as HTMLElement
                if (!valueEl) return

                const originalText = valueEl.innerText
                const numberMatch = originalText.match(/[\d,.]+/)
                const numberVal = numberMatch ? parseFloat(numberMatch[0].replace(/,/g, '')) : 0
                const prefix = originalText.split(numberMatch ? numberMatch[0] : '')[0] || ''
                const suffix = originalText.split(numberMatch ? numberMatch[0] : '')[1] || ''

                // Create a timeline for each item
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    }
                })

                // 1. Line expands first
                if (lineEl) {
                    tl.fromTo(lineEl,
                        { width: 0, opacity: 0 },
                        { width: "3rem", opacity: 1, duration: 0.5, ease: "power2.out" }
                    )
                }

                // 2. Text slides up with blur removal
                tl.fromTo(item,
                    { y: 40, opacity: 0, filter: "blur(10px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
                    "-=0.3"
                )

                // 3. Counting animation (integrated into timeline)
                const counter = { val: 0 }
                tl.to(counter, {
                    val: numberVal,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: () => {
                        const isFloat = numberVal % 1 !== 0
                        const current = isFloat ? counter.val.toFixed(1) : Math.round(counter.val)
                        valueEl.innerText = `${prefix}${current}${suffix}`
                    }
                }, "<") // Start with the slide
            })

        }, containerRef)

        return () => ctx.revert()
    }, [stats])

    return (
        <section ref={containerRef} className="relative w-full py-20 md:py-48 bg-neutral-950 overflow-hidden">
            <style jsx global>{`
                .text-gold-gradient {
                    background: linear-gradient(to bottom, #F7EF8A 0%, #D4AF37 50%, #C5A059 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* LEFT: Dominant Image Card */}
                <div
                    ref={imageContainerRef}
                    className="w-full md:w-7/12 aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/4] relative overflow-hidden shadow-[0_0_0_1px_rgba(212,175,55,0.2)] bg-neutral-900"
                >
                    <div ref={imageRef} className="absolute inset-0 w-full h-full">
                        <Image
                            src={image}
                            alt="Project Highlight"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    </div>

                    {/* Architectural Lines Overlay */}
                    <div className="absolute inset-4 border border-white/10 z-10" />
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-[#D4AF37]" />
                            <span className="text-white font-serif italic text-lg">Visualizing Scale</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Stats Grid */}
                <div className="w-full md:w-5/12 flex flex-col justify-center">

                    {/* Header */}
                    <div className="mb-16 border-l border-[#D4AF37] pl-8 py-2">
                        <h2 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
                            Project <br />
                            <span className="font-serif italic text-[#D4AF37]">Highlights</span>
                        </h2>
                        <p className="text-white/40 text-sm md:text-lg tracking-wide max-w-md font-light">
                            Key metrics defining the scale and precision of this development.
                        </p>
                    </div>

                    {/* The 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:gap-x-24 md:gap-y-24">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item flex flex-col gap-3 group">
                                {/* Index & Line */}
                                <div className="flex items-center gap-3 mb-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[#D4AF37] font-mono text-xs">0{i + 1}</span>
                                    <div className="stat-line h-px w-12 bg-white" />
                                </div>

                                {/* Value */}
                                <h3 className="stat-value text-gold-gradient text-4xl md:text-7xl font-serif font-medium tracking-tight">
                                    {stat.value}
                                </h3>

                                {/* Label */}
                                <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.25em] font-medium group-hover:text-white transition-colors duration-300">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
