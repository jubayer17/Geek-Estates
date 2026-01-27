"use client"

import React, { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LetsConnect() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const selector = gsap.utils.selector(sectionRef)

            // Initial States for Header
            gsap.set(selector('[data-anim="bg-letter"]'), {
                opacity: 0,
                scale: 0,
                rotation: () => Math.random() * 90 - 45,
                x: () => Math.random() * 200 - 100,
                y: () => Math.random() * 200 - 100
            })
            gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
            gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })

            // 1. Header Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            })

            tl.to(selector('[data-anim="bg-letter"]'), {
                opacity: 0.05,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                duration: 1.5,
                stagger: { amount: 0.5, from: "random" },
                ease: "elastic.out(1, 0.5)"
            })
                .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1.2")
                .to(selector('[data-anim="title-line"]'), { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" }, "-=1.0")

            // 2. Form Entrance
            gsap.from(selector('.input-group'), {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-linear-to-br from-slate-900 via-slate-800 to-neutral-900 text-white overflow-hidden relative min-h-screen flex flex-col justify-center">
            {/* Abstract Kinetic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(231,200,115,0.05),transparent_50%)]"></div>
                {/* Animated Grid Lines */}
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '100px 100px', maskImage: 'radial-gradient(circle at center, black, transparent 80%)' }}></div>
            </div>

            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">

                {/* Header Section (Standardized Structure) */}
                <div className="relative mb-16 md:mb-24">
                    {/* Background Big Text (Unique Animation: Scattered Fly-In) */}
                    <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                        <h2 className="text-[18vw] font-bold text-white leading-none tracking-tighter text-left flex justify-start">
                            {"INQUIRY".split("").map((letter, i) => (
                                <span key={i} data-anim="bg-letter" className="inline-block opacity-0">
                                    {letter}
                                </span>
                            ))}
                        </h2>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pt-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-px bg-[#E7C873]"></span>
                                <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm opacity-0">Concierge</span>
                            </div>

                            <div className="relative">
                                <div className="overflow-hidden">
                                    <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.9] opacity-0">
                                        Start Your
                                    </h2>
                                </div>
                                <div className="overflow-hidden ml-0 lg:ml-24">
                                    <h2 data-anim="title-line" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-slate-300 leading-[0.9] opacity-0">
                                        <span className="relative inline-block">
                                            Journey
                                            <span className="absolute -right-6 top-0 text-xl md:text-3xl not-italic font-light text-[#E7C873]">*</span>
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Premium Minimalist Form */}
                <div className="w-full max-w-5xl mx-auto mt-20">
                    <form className="flex flex-col">
                        {/* Input Group 1 */}
                        <div className="input-group group relative py-10 md:py-16 border-t border-white/10 transition-colors duration-500 hover:bg-white/[0.02]">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12">
                                <label className="text-[#E7C873] font-mono text-sm tracking-[0.2em] w-32 shrink-0">01 / NAME</label>
                                <input
                                    type="text"
                                    placeholder="What should we call you?"
                                    className="w-full bg-transparent border-none p-0 text-3xl md:text-5xl lg:text-6xl font-light text-white placeholder-white/20 focus:ring-0 focus:outline-none transition-all duration-300"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E7C873] group-hover:w-full transition-all duration-700 ease-out"></div>
                        </div>

                        {/* Input Group 2 */}
                        <div className="input-group group relative py-10 md:py-16 border-t border-white/10 transition-colors duration-500 hover:bg-white/[0.02]">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12">
                                <label className="text-[#E7C873] font-mono text-sm tracking-[0.2em] w-32 shrink-0">02 / CONTACT</label>
                                <input
                                    type="text"
                                    placeholder="Where can we reach you?"
                                    className="w-full bg-transparent border-none p-0 text-3xl md:text-5xl lg:text-6xl font-light text-white placeholder-white/20 focus:ring-0 focus:outline-none transition-all duration-300"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E7C873] group-hover:w-full transition-all duration-700 ease-out"></div>
                        </div>

                        {/* Submit Action */}
                        <div className="input-group pt-16 flex justify-end">
                            <button type="button" className="group relative inline-flex items-center gap-6 px-12 py-6 overflow-hidden rounded-full bg-white/5 hover:bg-[#E7C873] transition-all duration-500">
                                <span className="relative z-10 text-sm md:text-base uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500 font-medium">Initialize Request</span>
                                <div className="relative z-10 w-10 h-10 rounded-full border border-white/20 group-hover:border-black/20 flex items-center justify-center transition-colors duration-500">
                                    <ArrowRight className="w-5 h-5 text-white group-hover:text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
