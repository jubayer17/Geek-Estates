"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { howItWorksSteps, howItWorksImages } from '@/lib/data/howItWorksData'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null)
    const trunkRef = useRef<HTMLDivElement>(null)
    const stepRefs = useRef<(HTMLDivElement | null)[]>([])
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const selector = gsap.utils.selector(sectionRef)

            // Header Animations (Same as before)
            gsap.set(selector('[data-anim="bg-letter"]'), { y: -100, opacity: 0 })
            gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
            gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
            gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })

            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            })

            headerTl.to(selector('[data-anim="bg-letter"]'), { y: 0, opacity: 0.03, duration: 1.2, stagger: 0.05, ease: "back.out(1.7)" })
                .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "circ.out" }, "-=1.0")
                .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "circ.out" }, "-=0.8")
                .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")

            // Tree/Trunk Animation
            // The trunk grows downwards
            gsap.fromTo(trunkRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1
                    }
                }
            )

            // Steps Animation
            stepRefs.current.forEach((step, index) => {
                if (!step) return

                const direction = index % 2 === 0 ? -50 : 50 // Alternate slide direction

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: step,
                        start: "top 70%", // Animate when step is in view
                        toggleActions: "play none none reverse"
                    }
                })

                // 1. Reveal Branch/Connector
                tl.fromTo(step.querySelector('.branch-connector'),
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
                )

                    // 2. Pop the Node
                    .fromTo(step.querySelector('.tree-node'),
                        { scale: 0, boxShadow: "0 0 0 0px rgba(231, 200, 115, 0)" },
                        { scale: 1, boxShadow: "0 0 0 10px rgba(231, 200, 115, 0.2)", duration: 0.5, ease: "back.out(1.7)" },
                        "-=0.6"
                    )

                    // 3. Reveal Content Card
                    .fromTo(step.querySelector('.content-card'),
                        { x: direction, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                        "-=0.6"
                    )

                    // 4. Reveal Image
                    .fromTo(step.querySelector('.image-card'),
                        { x: -direction, opacity: 0, scale: 0.9 },
                        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
                        "-=0.8"
                    )
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-40 w-full overflow-hidden relative bg-[#FDFDFD]">
            {/* Premium Architectural Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* 1. Fine Vertical Lines (Architectural Rhythm) */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '80px 100%'
                    }}>
                </div>

                {/* 2. Subtle Cross-Dot Pattern at Intersections */}
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: 'radial-gradient(#E7C873 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                        backgroundPosition: '0 0'
                    }}>
                </div>

                {/* 3. Ambient Gold Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E7C873]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E7C873]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Header Section (Preserved) */}
            <div className="relative mb-32 md:mb-48 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 z-10">
                <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                    <h2 className="text-[18vw] font-bold text-slate-900 leading-none tracking-tighter text-left font-serif flex">
                        {"PROCESS".split("").map((letter, i) => (
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
                            <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">How It Works</span>
                        </div>

                        <div className="relative left-0 md:left-4">
                            <div className="overflow-hidden">
                                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-slate-900 tracking-tight leading-[0.9]">
                                    Simple
                                </h2>
                            </div>
                            <div className="overflow-hidden md:pl-0 lg:ml-24">
                                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-slate-800 leading-[0.9]">
                                    <span className="relative inline-block">
                                        Process
                                        <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="lg:max-w-md pb-4">
                        <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
                            We help you find your dream home with a simple and easy process. Follow these three steps to get started.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tree Structure Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pb-20">

                {/* Central Trunk Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 transform md:-translate-x-1/2 h-full">
                    <div
                        ref={trunkRef}
                        className="w-full bg-gradient-to-b from-[#E7C873] via-[#E7C873] to-slate-200 origin-top shadow-[0_0_10px_rgba(231,200,115,0.5)]"
                        style={{ height: '0%' }}
                    ></div>
                </div>

                <div className="relative space-y-32 md:space-y-48">
                    {howItWorksSteps.map((step, index) => (
                        <div
                            key={index}
                            ref={el => { stepRefs.current[index] = el }}
                            className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Central Node & Branch Connector */}
                            <div className="absolute left-4 md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                                {/* The Node (Diamond Shape for Premium Feel) */}
                                <div className="tree-node w-6 h-6 rotate-45 bg-[#E7C873] border-4 border-white shadow-lg relative z-20 transition-transform duration-500 ease-out group-hover:scale-125"></div>

                                {/* Branch Connector (Desktop Only) */}
                                <div className={`branch-connector hidden md:block absolute top-1/2 h-[1px] bg-gradient-to-r from-[#E7C873]/50 to-transparent w-40 origin-left z-0 ${index % 2 === 0 ? 'right-0 rotate-0' : 'left-0 rotate-180'
                                    }`}></div>
                            </div>

                            {/* Content Side */}
                            <div className={`flex-1 w-full pl-16 md:pl-0 content-card ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                                }`}>
                                <div className="flex flex-col gap-6 items-start md:items-end group relative">
                                    {/* Step Number Background - Big & Subtle */}
                                    <div className={`absolute -top-20 -z-10 text-[10rem] font-serif leading-none text-slate-50 opacity-0 transition-all duration-700 ${index % 2 === 0 ? '-right-10' : '-left-10'
                                        } group-hover:opacity-100 group-hover:translate-y-4`}>
                                        0{index + 1}
                                    </div>

                                    <div className={`
                                        w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#E7C873]
                                        mb-2 transition-all duration-500 border border-slate-100
                                        ${hoveredIndex === index ? 'bg-[#E7C873] text-white scale-110 rotate-12 shadow-[0_20px_40px_-10px_rgba(231,200,115,0.4)]' : ''}
                                        ${index % 2 !== 0 ? 'md:self-start' : ''}
                                    `}>
                                        <step.icon size={36} strokeWidth={1.5} />
                                    </div>

                                    <h3 className={`text-4xl md:text-5xl font-serif text-slate-900 transition-colors duration-300 ${hoveredIndex === index ? 'text-[#E7C873]' : ''} ${index % 2 !== 0 ? 'md:self-start' : ''}`}>
                                        {step.title}
                                    </h3>

                                    <p className={`text-slate-500 leading-relaxed text-lg md:text-xl font-light ${index % 2 !== 0 ? 'md:self-start' : ''}`}>
                                        {step.description}
                                    </p>

                                    <div className={`pt-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[#E7C873] ${index % 2 !== 0 ? 'md:self-start' : ''}`}>
                                        <span className={`w-12 h-[1px] bg-[#E7C873] transition-all duration-500 ${hoveredIndex === index ? 'w-20' : ''}`}></span>
                                        Step 0{index + 1}
                                    </div>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className={`flex-1 w-full pl-16 md:pl-0 image-card ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'
                                }`}>
                                <div className={`
                                    relative h-[350px] md:h-[500px] w-full rounded-none overflow-hidden shadow-2xl
                                    transition-all duration-1000 ease-out
                                    ${hoveredIndex === index ? 'transform scale-[1.02] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]' : 'grayscale-[20%]'}
                                `}>
                                    <Image
                                        src={howItWorksImages[index]?.src || '/placeholder.jpg'}
                                        alt={howItWorksImages[index]?.alt || step.title}
                                        fill
                                        className={`object-cover transition-transform duration-[1.5s] ease-out ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                                    {/* Floating Badge */}
                                    <div className={`
                                        absolute bottom-8 left-8 bg-white/95 backdrop-blur-xl px-8 py-4 
                                        flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transform transition-transform duration-500
                                        border-l-4 border-[#E7C873]
                                        ${hoveredIndex === index ? 'translate-x-4' : ''}
                                    `}>
                                        <div className="p-2 bg-[#E7C873]/10 rounded-full">
                                            <CheckCircle2 size={24} className="text-[#E7C873]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">Status</span>
                                            <span className="text-slate-900 font-serif text-lg">Completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

