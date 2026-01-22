"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProjectGalleryProps {
    images: string[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalWidth = scrollRef.current!.scrollWidth
            const windowWidth = window.innerWidth

            gsap.to(scrollRef.current, {
                x: () => -(totalWidth - windowWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-slate-900 overflow-hidden">
            <div ref={triggerRef} className="h-screen flex items-center overflow-hidden relative">

                {/* Intro Text (Absolute) */}
                <div className="absolute top-12 left-12 z-20 mix-blend-difference text-white pointer-events-none">
                    <span className="text-[#E7C873] uppercase tracking-[0.2em] text-sm font-medium mb-2 block">
                        Gallery
                    </span>
                    <h2 className="text-4xl font-light">
                        Visual <span className="font-serif italic text-[#E7C873]">Journey</span>
                    </h2>
                </div>

                {/* Horizontal Scroll Container */}
                <div ref={scrollRef} className="flex gap-10 px-[10vw] items-center h-[70vh]">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`relative shrink-0 overflow-hidden transition-transform hover:scale-105 duration-500
                                ${i % 2 === 0 ? "w-[60vw] h-full" : "w-[40vw] h-[80%]"}
                            `}
                        >
                            <Image
                                src={img}
                                alt={`Gallery ${i}`}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 text-white text-xs uppercase tracking-widest">
                                View {i + 1}
                            </div>
                        </div>
                    ))}

                    {/* End Card */}
                    <div className="shrink-0 w-[30vw] h-[50%] flex items-center justify-center border border-white/20 text-white">
                        <span className="uppercase tracking-widest text-sm">End of Gallery</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
