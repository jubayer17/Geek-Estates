"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProjectHeroProps {
    title: string
    location: string
    category: string
    image: string
}

export default function ProjectHero({ title, location, category, image }: ProjectHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageWrapperRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const metaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            // 1. Initial State Setup
            gsap.set(".hero-char", { y: 100, opacity: 0, rotateX: -45 })
            gsap.set(metaRef.current, { y: 20, opacity: 0 })

            // 2. Intro Animation Sequence
            tl.fromTo(imageWrapperRef.current,
                {
                    clipPath: "inset(40% 45% 40% 45% round 20px)",
                    scale: 0.9,
                    filter: "brightness(0)"
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    scale: 1,
                    filter: "brightness(1)",
                    duration: 2.2,
                    ease: "power3.inOut"
                }
            )
                .to(".hero-image", {
                    scale: 1,
                    duration: 2.5,
                    ease: "power2.out"
                }, "-=2.2")

                // Text Reveal (Overlapping with image reveal)
                .to(".hero-char", {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.04,
                    ease: "back.out(1.7)",
                }, "-=1.0")

                .to(metaRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.8")

            // 3. Scroll Outro / Parallax
            // Image Parallax + Blur
            gsap.to(".hero-image", {
                scale: 1.15,
                yPercent: 15,
                filter: "blur(8px) brightness(0.6)",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            })

            // Text Parallax + Fade Out
            gsap.to([titleRef.current, metaRef.current], {
                y: -150,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "60% top", // Fades out faster
                    scrub: true
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#050505]">

            {/* Image Wrapper with Clip Path */}
            <div
                ref={imageWrapperRef}
                className="absolute inset-0 w-full h-full z-0"
                style={{ clipPath: "inset(40% 45% 40% 45% round 20px)" }} // Initial state matches animation start
            >
                <div className="relative w-full h-full hero-image scale-125 will-change-transform">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Sophisticated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto text-white perspective-[1000px]">

                {/* Meta Info */}
                <div ref={metaRef} className="mb-6 md:mb-8 overflow-hidden">
                    <div className="flex items-center justify-center gap-3 md:gap-6 text-[#E7C873] tracking-[0.4em] uppercase text-xs md:text-sm font-medium">
                        <span>{category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span>{location}</span>
                    </div>
                </div>

                {/* Animated Heading */}
                <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-center">
                    {title.split(" ").map((word, wordIndex) => (
                        <span key={wordIndex} className="inline-block whitespace-nowrap mx-2 md:mx-4">
                            {word.split("").map((char, charIndex) => (
                                <span
                                    key={`${wordIndex}-${charIndex}`}
                                    className="hero-char inline-block origin-bottom transform-style-3d will-change-transform"
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/50 animate-pulse">
                <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            </div>
        </section>
    )
}
