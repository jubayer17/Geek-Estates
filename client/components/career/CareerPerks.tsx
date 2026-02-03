"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as Icons from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type CareerPerk = {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export default function CareerPerks() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    
    const [perks, setPerks] = useState<CareerPerk[]>([])
    const [sectionInfo, setSectionInfo] = useState({
        badge: "Employee Benefits",
        title: "Everything You Need To Thrive.",
        description: "We believe that when you feel your best, you do your best work. That's why we've crafted a benefits package that supports you inside and outside the office."
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pageRes, perksRes] = await Promise.all([
                    fetch('http://localhost:4001/career/page'),
                    fetch('http://localhost:4001/career/perks')
                ])
                
                if (pageRes.ok) {
                    const page = await pageRes.json()
                    if (page) {
                        setSectionInfo({
                            badge: page.perksBadge || "Employee Benefits",
                            title: page.perksTitle || "Everything You Need To Thrive.",
                            description: page.perksDescription || "We believe that when you feel your best, you do your best work. That's why we've crafted a benefits package that supports you inside and outside the office."
                        })
                    }
                }

                if (perksRes.ok) {
                    const perksData = await perksRes.json()
                    setPerks(perksData)
                }
            } catch (error) {
                console.error("Failed to fetch perks data:", error)
            }
        }
        
        fetchData()
    }, [])

    useEffect(() => {
        if (perks.length === 0) return;

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(
                ".perks-header",
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

            // List Stagger
            const items = listRef.current?.children
            if (items && items.length > 0) {
                gsap.fromTo(
                    items,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 75%",
                        },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [perks])

    const titleWords = sectionInfo.title.split(' ');
    const mainTitle = titleWords.slice(0, Math.max(1, titleWords.length - 2)).join(' ');
    const subTitle = titleWords.slice(Math.max(1, titleWords.length - 2)).join(' ');

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-20 bg-[#1A1A1A] text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#E7C873]/5 to-transparent pointer-events-none" />

            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="perks-header relative mb-24 pl-0 lg:pl-12">
                    {/* Decorative Element */}
                    <div className="absolute -top-24 -left-10 text-[15rem] font-serif font-bold text-white opacity-[0.02] select-none pointer-events-none hidden lg:block">
                        PERKS
                    </div>

                    <div className="flex flex-col lg:flex-row items-end gap-12">
                        <div className="relative z-10 lg:w-2/3">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-[2px] bg-[#E7C873]"></span>
                                <span className="text-[#E7C873] uppercase tracking-[0.3em] text-sm font-bold">
                                    {sectionInfo.badge}
                                </span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                                {mainTitle} <br />
                                <span className="text-gray-500 italic font-light">{subTitle}</span>
                            </h2>
                        </div>

                        <div className="lg:w-1/3 pb-2 border-b border-gray-800 lg:border-none">
                            <p className="text-xl text-gray-400 font-light leading-relaxed">
                                {sectionInfo.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {perks.map((perk, index) => {
                         // Dynamic Icon
                         // @ts-ignore
                         const Icon = Icons[perk.icon] || Icons.Star;

                        return (
                            <div key={perk.id} className="flex gap-6 group">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#E7C873] group-hover:border-[#E7C873] transition-all duration-500">
                                        <Icon className="w-8 h-8 text-[#E7C873] group-hover:text-[#1A1A1A] transition-colors duration-500" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#E7C873] transition-colors duration-300">
                                        {perk.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
                                        {perk.description}
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
