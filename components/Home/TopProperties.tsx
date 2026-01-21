"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { properties } from "@/lib/data/properties"

gsap.registerPlugin(ScrollTrigger)

type Project = {
    id: string | number
    name: string
    location?: string
    price?: string
    image: string
    tags?: string[]
    specs?: { beds: number; baths: number; sqft: number } // Added specs to type if not present in data, handle gracefully
}

type Props = {
    heading?: string
    projects?: Project[]
}

export default function TopNotchedProperties({
    heading = "Best Properties",
    projects
}: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const rootRef = useRef<HTMLElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const detailsRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)

    const safeProps = properties && properties.length ? properties : []
    const activeProp = safeProps[activeIndex] ?? null

    // Initial Entrance Animation
    useEffect(() => {
        if (!rootRef.current) return

        const context = gsap.context(() => {
            const selector = gsap.utils.selector(rootRef)

            // Set initial states for premium header
            gsap.set(selector('[data-anim="bg-letter"]'), { filter: "blur(20px)", scale: 1.5, opacity: 0 })
            gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
            gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
            gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })

            // Content Entrance Setup
            gsap.set(imageRef.current, { clipPath: "inset(0 100% 0 0)" })
            gsap.set(selector('.stagger-item'), { opacity: 0, y: 30 })

            // Header Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 75%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            })

            tl.to(selector('[data-anim="bg-letter"]'), { filter: "blur(0px)", scale: 1, opacity: 0.03, duration: 1.5, stagger: 0.08, ease: "power2.out" })
                .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=1.0")
                .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=0.8")
                .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")

            // Content Entrance Animation
            const contentTl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            })

            contentTl.to(imageRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power4.inOut" })
                .to(selector('.stagger-item'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=1.0")

        }, rootRef)

        return () => context.revert()
    }, [])

    // Slide Transition Animation
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const context = gsap.context(() => {
            const selector = gsap.utils.selector(rootRef)

            // Animate In (Enter)
            const tl = gsap.timeline({
                onComplete: () => setIsAnimating(false)
            })

            // Reset elements before animating in
            // (Note: The 'Out' animation sets them to hidden state, so we animate 'from' that or 'to' visible)

            tl.fromTo(imageRef.current,
                { clipPath: activeIndex > (safeProps.length / 2) ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.1 }, // Alternating direction based on context could be cool, but let's stick to consistent for now
                { clipPath: "inset(0 0 0 0)", scale: 1, duration: 1.2, ease: "power4.inOut" }
            )

            tl.fromTo(selector('.stagger-item'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                "-=0.8"
            )

        }, rootRef)

        return () => context.revert()
    }, [activeIndex, safeProps.length]) // Added activeIndex dependency

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)

        const context = gsap.context(() => {
            const selector = gsap.utils.selector(rootRef)
            const tl = gsap.timeline({
                onComplete: () => {
                    setActiveIndex((prev) => (prev + 1) % safeProps.length)
                }
            })

            // Animate Out
            tl.to(imageRef.current, { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power4.inOut" })
            tl.to(selector('.stagger-item'), { y: -30, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.in" }, "<")
        }, rootRef)
    }

    const handlePrev = () => {
        if (isAnimating) return
        setIsAnimating(true)

        const context = gsap.context(() => {
            const selector = gsap.utils.selector(rootRef)
            const tl = gsap.timeline({
                onComplete: () => {
                    setActiveIndex((prev) => (prev - 1 + safeProps.length) % safeProps.length)
                }
            })

            // Animate Out
            tl.to(imageRef.current, { clipPath: "inset(0 0 0 100%)", duration: 1, ease: "power4.inOut" })
            tl.to(selector('.stagger-item'), { y: -30, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.in" }, "<")
        }, rootRef)
    }

    return (
        <section ref={rootRef} className="py-20 md:py-32 bg-slate-50 overflow-hidden relative">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header Section (Unchanged) */}
                <div className="relative mb-16 md:mb-24">
                    {/* Background Big Text */}
                    <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                        <h2 className="text-[18vw] font-bold text-slate-900 leading-none tracking-tighter text-left flex">
                            {"FEATURED".split("").map((letter, i) => (
                                <span key={i} data-anim="bg-letter" className="inline-block opacity-0">
                                    {letter}
                                </span>
                            ))}
                        </h2>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-20 pt-10">
                        <div className="flex-1">
                            <div className="flex items-center ml-0 md:ml-4 gap-4 mb-8">
                                <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                                <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Top Selection</span>
                            </div>

                            <div className="relative left-0 md:left-4">
                                <div className="overflow-hidden">
                                    <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-slate-900 tracking-tight leading-[0.9]">
                                        Best
                                    </h2>
                                </div>
                                <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                                    <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-slate-800 leading-[0.9]">
                                        <span className="relative inline-block">
                                            Properties
                                            <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="lg:max-w-md pb-4">
                            <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
                                Discover exceptional properties curated for discerning tastes, each representing <span className="text-[#E7C873] font-medium">the pinnacle of modern living</span> and architectural excellence.
                            </p>
                        </div>
                    </div>
                </div>

                {/* New Inner Content Structure */}
                <div className="flex flex-col lg:flex-row w-full min-h-[700px] border-y border-slate-200 relative bg-white">

                    {/* Left Panel: Info & Navigation */}
                    <div ref={detailsRef} className="w-full lg:w-[35%] flex flex-col justify-between p-8 md:p-12 lg:p-16 border-r border-slate-100 relative z-10 bg-white">

                        {/* Top: Counter & Status */}
                        <div className="flex items-center justify-between stagger-item">
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-light text-slate-900 leading-none">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </span>
                                <span className="text-sm font-mono text-slate-400 mb-1">
                                    / {String(safeProps.length).padStart(2, '0')}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {activeProp?.tags?.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-100 text-[10px] uppercase tracking-widest text-slate-600 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Middle: Main Info */}
                        <div className="py-10 flex-1 flex flex-col justify-center">
                            <h3 className="stagger-item text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1] mb-6">
                                {activeProp?.name}
                            </h3>

                            <div className="stagger-item flex items-center gap-3 text-slate-500 mb-8 font-light tracking-wide text-sm md:text-base">
                                <svg className="w-4 h-4 text-[#E7C873]" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.134 2 5 5.134 5 9c0 6 7 13 7 13s7-7 7-13c0-3.866-3.134-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="9" r="2" fill="currentColor" className="text-[#E7C873]" />
                                </svg>
                                {activeProp?.location}
                            </div>

                            <div className="stagger-item text-3xl md:text-4xl font-light text-[#E7C873] mb-10">
                                {activeProp?.price}
                            </div>

                            <div className="stagger-item grid grid-cols-3 gap-8 border-t border-slate-100 pt-8">
                                {/* Mock Specs - In a real app, these would come from the property object */}
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">Beds</span>
                                    <span className="text-xl md:text-2xl font-light text-slate-900">4</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">Baths</span>
                                    <span className="text-xl md:text-2xl font-light text-slate-900">3.5</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">Sqft</span>
                                    <span className="text-xl md:text-2xl font-light text-slate-900">3,200</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Controls */}
                        <div className="stagger-item flex items-center justify-between mt-auto">
                            <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-[#E7C873] transition-colors">
                                <span>View Details</span>
                                <span className="w-8 h-[1px] bg-slate-300 group-hover:bg-[#E7C873] group-hover:w-12 transition-all duration-300"></span>
                            </button>

                            <div className="flex gap-4">
                                <button
                                    onClick={handlePrev}
                                    className="w-12 h-12 flex items-center justify-center border border-slate-200 hover:border-[#E7C873] hover:text-[#E7C873] transition-all duration-300 group"
                                    aria-label="Previous Property"
                                >
                                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 flex items-center justify-center border border-slate-200 hover:border-[#E7C873] hover:text-[#E7C873] transition-all duration-300 group"
                                    aria-label="Next Property"
                                >
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Immersive Image */}
                    <div className="flex-1 relative overflow-hidden bg-slate-200 group h-[500px] lg:h-auto">
                        <div ref={imageRef} className="absolute inset-0 w-full h-full">
                            {activeProp?.image && (
                                <Image
                                    src={activeProp.image}
                                    alt={activeProp.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )}
                            {/* Overlay Gradient for contrast */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700 pointer-events-none" />
                        </div>

                        {/* Interactive "Explore" Button floating on image */}
                        <div className="absolute bottom-0 right-0 p-0 overflow-hidden">
                            <div className="w-32 h-32 bg-[#E7C873] flex items-center justify-center cursor-pointer hover:bg-slate-900 transition-colors duration-500 group/btn relative">
                                <span className="text-slate-900 group-hover/btn:text-white text-xs font-bold uppercase tracking-widest relative z-10 transition-colors duration-500">
                                    Explore
                                </span>
                                {/* Diagonal sweep effect */}
                                <div className="absolute inset-0 bg-slate-900 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
