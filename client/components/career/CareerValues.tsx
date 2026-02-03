"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as Icons from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type CareerValue = {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export default function CareerValues() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    
    const [values, setValues] = useState<CareerValue[]>([])
    const [sectionInfo, setSectionInfo] = useState({
        badge: "Our Core Philosophy",
        title: "Driven by Purpose",
        description: "At Geek Estate, we don't just build properties; we build legacies."
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pageRes, valuesRes] = await Promise.all([
                    fetch('http://localhost:4001/career/page'),
                    fetch('http://localhost:4001/career/values')
                ])
                
                if (pageRes.ok) {
                    const page = await pageRes.json()
                    if (page) {
                        setSectionInfo({
                            badge: page.valuesBadge || "Our Core Philosophy",
                            title: page.valuesTitle || "Driven by Purpose",
                            description: page.valuesDescription || "At Geek Estate, we don't just build properties; we build legacies."
                        })
                    }
                }

                if (valuesRes.ok) {
                    const valuesData = await valuesRes.json()
                    setValues(valuesData)
                }
            } catch (error) {
                console.error("Failed to fetch values data:", error)
            }
        }
        
        fetchData()
    }, [])

    useEffect(() => {
        // Only run animation if we have data or if it's the initial render (wait for data ideally, but GSAP can handle updates usually if we use dependencies)
        // However, with dynamic data, we should wait until data is loaded to set up animations, or use useLayoutEffect/revert.
        // Let's rely on the dependency array of [values] to re-trigger or setup.
        
        if (values.length === 0) return;

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
            if (cards && cards.length > 0) {
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
    }, [values]) // Re-run when values change

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
                                {sectionInfo.badge}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.05]">
                            {sectionInfo.title.split(' ').slice(0, -1).join(' ')} <br />
                            <span className="italic relative inline-block">
                                {sectionInfo.title.split(' ').pop()}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E7C873]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                        </h2>
                    </div>
                    <div className="lg:w-1/2 values-header">
                        <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                            {sectionInfo.description}
                        </p>
                    </div>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((val, index) => {
                        // Dynamic Icon
                        // @ts-ignore
                        const Icon = Icons[val.icon] || Icons.Star;
                        
                        return (
                            <div
                                key={val.id}
                                className="group p-8 bg-gray-50 hover:bg-[#1A1A1A] transition-all duration-500 rounded-xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                    <Icon className="w-32 h-32 text-white transform rotate-12" />
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#E7C873] transition-colors duration-500 shadow-sm">
                                        <Icon className="w-6 h-6 text-[#1A1A1A]" />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 group-hover:text-white transition-colors duration-500 font-serif">
                                        {val.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed text-sm">
                                        {val.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
