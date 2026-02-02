"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Zap, Target, Heart } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const values = [
    {
        icon: Users,
        title: "Collaborative Culture",
        description: "We believe in the power of collective intelligence. Our teams work together to solve complex challenges and achieve greatness.",
    },
    {
        icon: Zap,
        title: "Innovation First",
        description: "We push boundaries and embrace new technologies to redefine the real estate experience for the modern world.",
    },
    {
        icon: Target,
        title: "Excellence Driven",
        description: "Mediocrity has no place here. We strive for perfection in every detail, from code to customer interactions.",
    },
    {
        icon: Heart,
        title: "People Centric",
        description: "Our people are our greatest asset. We prioritize well-being, growth, and a supportive environment for everyone.",
    },
]

export default function CareerValues() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(
                ".values-header",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            )

            // Cards Stagger Animation
            const cards = cardsRef.current?.children
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-20 bg-white overflow-hidden relative">
            {/* Background Watermark */}
            <div className="absolute top-10 left-[-5%] text-[20rem] font-serif font-bold text-gray-50 opacity-[0.03] select-none pointer-events-none leading-none">
                01
            </div>

            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24 items-end">
                    <div className="lg:w-1/2 values-header">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E7C873]/10 rounded-full mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#E7C873]" />
                            <span className="text-[#E7C873] uppercase tracking-[0.2em] text-xs font-bold">
                                Our Core Philosophy
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.05]">
                            Driven by <br />
                            <span className="italic relative inline-block">
                                Purpose
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E7C873]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                            <span className="text-gray-300 mx-4 font-light">&</span>
                            <span className="text-[#E7C873]">Passion</span>
                        </h2>
                    </div>
                    <div className="lg:w-1/2 values-header pb-4">
                        <div className="pl-0 lg:pl-12 border-l-0 lg:border-l-2 border-[#E7C873]/30">
                            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                                At Geek Estate, we don&apos;t just build properties; we build legacies. Our core values are the compass that guides every decision, ensuring we remain true to our mission of redefining modern living.
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="group p-8 border border-gray-100 bg-gray-50/50 hover:bg-[#1F4B43] transition-colors duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <value.icon className="w-24 h-24 text-[#E7C873] -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#E7C873] transition-colors duration-500">
                                    <value.icon className="w-6 h-6 text-[#1F4B43] group-hover:text-[#1F4B43] transition-colors duration-500" />
                                </div>

                                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-white transition-colors duration-500">
                                    {value.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
