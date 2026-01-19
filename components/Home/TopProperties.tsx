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
}

type Props = {
    heading?: string
    projects?: {
        left: Project
        rightTop: Project
        rightBottomLeft: Project
        infoCard?: { title: string; subtitle?: string }
    }
}

export default function TopNotchedProperties({
    heading = "Best Properties",
    projects
}: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [indoorIndex, setIndoorIndex] = useState(0)
    const rootRef = useRef<HTMLElement>(null)
    const mainImageRef = useRef<HTMLDivElement>(null)
    const indoorImageRef = useRef<HTMLDivElement>(null)

    const safeProps = properties && properties.length ? properties : []
    const activeProp = safeProps[activeIndex] ?? null

    const leftProp = projects?.left ?? (activeProp ? {
        id: activeProp.id,
        name: activeProp.name,
        location: activeProp.location,
        price: activeProp.price,
        image: activeProp.image,
        tags: activeProp.tags
    } : projects?.left)

    const rightTopProp = projects?.rightTop ?? (activeProp ? {
        id: `${activeProp.id}-rightTop`,
        name: `${activeProp.name} — Interiors`,
        image: activeProp.indoorImages && activeProp.indoorImages.length ? activeProp.indoorImages[0] : activeProp?.image
    } : projects?.rightTop)

    const infoCard = projects?.infoCard ?? {
        title: `${safeProps.length}+`,
        subtitle: `Properties\nExplore our wide variety of properties to find your dream home today`
    }

    useEffect(() => {
        if (!rootRef.current) return

        const context = gsap.context(() => {
            const selector = gsap.utils.selector(rootRef)

            // Premium entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            })

            // Staggered sophisticated entrance
            tl.from(selector('[data-anim="header"]'), {
                y: 80,
                opacity: 0,
                duration: 1.4,
                ease: "power4.out"
            })
                .from(selector('[data-anim="subtitle"]'), {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1")
                .from(selector('[data-elem="left"]'), {
                    y: 100,
                    opacity: 0,
                    scale: 0.92,
                    duration: 1.6,
                    ease: "power4.out",
                    clearProps: "transform"
                }, "-=0.7")
                .from(selector('[data-elem="tile"]'), {
                    y: 60,
                    x: 40,
                    opacity: 0,
                    stagger: 0.18,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=1.2")
                .from(selector('[data-elem="info"]'), {
                    scale: 0.85,
                    opacity: 0,
                    duration: 1,
                    ease: "back.out(1.4)"
                }, "-=0.9")

            // Floating badges with elegant motion
            gsap.to(selector('[data-elem="badge"]'), {
                y: -10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 2.5,
                stagger: {
                    each: 0.25,
                    from: "start"
                }
            })

            // Parallax effect on main image
            gsap.to(selector('[data-elem="left-image"]'), {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            })

            // Continuous subtle glow on info card
            gsap.to(selector('[data-anim="glow"]'), {
                opacity: 0.7,
                scale: 1.08,
                repeat: -1,
                yoyo: true,
                duration: 3.5,
                ease: "sine.inOut"
            })

            // Hover scale for main card
            const leftCard = selector('[data-elem="left"]')[0]
            if (leftCard) {
                leftCard.addEventListener("mouseenter", () => {
                    gsap.to(selector('[data-elem="left-image"]'), {
                        scale: 1.08,
                        duration: 1.2,
                        ease: "power3.out"
                    })
                })
                leftCard.addEventListener("mouseleave", () => {
                    gsap.to(selector('[data-elem="left-image"]'), {
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out"
                    })
                })
            }

            // Hover effects for tiles
            const tiles = selector('[data-elem="tile"]')
            tiles.forEach((tile: Element) => {
                const tileEl = tile as HTMLElement
                tileEl.addEventListener("mouseenter", () => {
                    gsap.to(tileEl, {
                        y: -8,
                        scale: 1.02,
                        duration: 0.6,
                        ease: "power2.out"
                    })
                })
                tileEl.addEventListener("mouseleave", () => {
                    gsap.to(tileEl, {
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    })
                })
            })

        }, rootRef)

        return () => {
            context.revert()
        }
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIndoorIndex(0)
    }, [activeIndex])

    // Animated property change
    function prevProperty() {
        if (!safeProps.length) return

        if (mainImageRef.current) {
            gsap.to(mainImageRef.current, {
                x: -60,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    setActiveIndex((s) => (s - 1 + safeProps.length) % safeProps.length)
                    gsap.fromTo(mainImageRef.current,
                        { x: 60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
                    )
                }
            })
        } else {
            setActiveIndex((s) => (s - 1 + safeProps.length) % safeProps.length)
        }
    }

    function nextProperty() {
        if (!safeProps.length) return

        if (mainImageRef.current) {
            gsap.to(mainImageRef.current, {
                x: 60,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    setActiveIndex((s) => (s + 1) % safeProps.length)
                    gsap.fromTo(mainImageRef.current,
                        { x: -60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
                    )
                }
            })
        } else {
            setActiveIndex((s) => (s + 1) % safeProps.length)
        }
    }

    function prevIndoor() {
        const n = activeProp?.indoorImages?.length ?? 0
        if (n === 0) return

        if (indoorImageRef.current) {
            gsap.to(indoorImageRef.current, {
                x: -40,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setIndoorIndex((s) => (s - 1 + n) % n)
                    gsap.fromTo(indoorImageRef.current,
                        { x: 40, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                    )
                }
            })
        } else {
            setIndoorIndex((s) => (s - 1 + n) % n)
        }
    }

    function nextIndoor() {
        const n = activeProp?.indoorImages?.length ?? 0
        if (n === 0) return

        if (indoorImageRef.current) {
            gsap.to(indoorImageRef.current, {
                x: 40,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setIndoorIndex((s) => (s + 1) % n)
                    gsap.fromTo(indoorImageRef.current,
                        { x: -40, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                    )
                }
            })
        } else {
            setIndoorIndex((s) => (s + 1) % n)
        }
    }

    return (
        <section ref={rootRef} className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="text-center w-full mb-8 md:mb-12 lg:mb-16">
                    <h3
                        data-anim="header"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent"
                    >
                        {heading}
                    </h3>
                    <p
                        data-anim="subtitle"
                        className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 md:mt-4 max-w-2xl mx-auto"
                    >
                        Discover exceptional properties curated for discerning tastes
                    </p>
                </div>

                <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3 items-stretch w-full">
                    <div className="lg:col-span-2">
                        <MainLeftCard
                            ref={mainImageRef}
                            project={leftProp}
                            dataset={safeProps}
                            activeIndex={activeIndex}
                            onPrev={prevProperty}
                            onNext={nextProperty}
                        />
                    </div>
                    <div className="lg:col-span-1 grid grid-rows-[auto_1fr] gap-4 sm:gap-6">
                        <div className="w-full h-full">
                            <RightTopSlider
                                ref={indoorImageRef}
                                project={rightTopProp}
                                indoorImages={activeProp?.indoorImages ?? []}
                                onPrev={prevIndoor}
                                onNext={nextIndoor}
                                activeIndoorIndex={indoorIndex}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <VideoCard video={activeProp?.video} name={activeProp?.name} />
                            <InfoCard title={infoCard.title} subtitle={infoCard.subtitle} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const MainLeftCard = React.forwardRef<HTMLDivElement, {
    project?: Project | null
    dataset?: Project[]
    activeIndex?: number
    onPrev?: () => void
    onNext?: () => void
}>(({ project, dataset, activeIndex, onPrev, onNext }, ref) => {
    return (
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-50 group" data-elem="left">
            <div
                ref={ref}
                className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] overflow-hidden"
                data-elem="left-image"
                style={{ transformOrigin: "center" }}
            >
                {project?.image ? (
                    <Image
                        src={project.image}
                        alt={String(project.name)}
                        fill
                        className="object-cover transition-transform duration-700"
                        priority
                    />
                ) : null}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Navigation buttons */}
            <button
                onClick={onPrev}
                aria-label="Previous property"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-slate-900" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button
                onClick={onNext}
                aria-label="Next property"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-slate-900" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Tags */}
            <div className="absolute left-4 md:left-6 top-4 md:top-6 flex gap-2 flex-wrap z-10">
                {(project?.tags || []).map((t, i) => (
                    <span
                        key={i}
                        data-elem="badge"
                        className="text-xs md:text-sm font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/95 text-slate-900 backdrop-blur-lg shadow-xl"
                    >
                        {t}
                    </span>
                ))}
            </div>

            {/* Property info */}
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 right-4 md:right-auto max-w-[90%] md:max-w-[70%] z-10">
                <div className="backdrop-blur-2xl bg-gradient-to-r from-black/60 via-black/40 to-transparent p-4 md:p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                        {project?.name}
                    </h4>
                    {project?.location && (
                        <p className="text-xs md:text-sm lg:text-base text-white/90 mt-2 flex items-center gap-2">
                            <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.134 2 5 5.134 5 9c0 6 7 13 7 13s7-7 7-13c0-3.866-3.134-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            {project.location}
                        </p>
                    )}
                    {project?.price && (
                        <div className="mt-3 md:mt-4 text-xl md:text-2xl lg:text-3xl font-bold text-white">
                            {project.price}
                        </div>
                    )}
                </div>
            </div>

            {/* Progress dots */}
            {dataset && dataset.length > 0 && (
                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex gap-2 z-10">
                    {dataset.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 md:w-10 bg-white' : 'w-6 bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
})

MainLeftCard.displayName = 'MainLeftCard'

const RightTopSlider = React.forwardRef<HTMLDivElement, {
    project?: Project | null
    indoorImages?: string[]
    onPrev?: () => void
    onNext?: () => void
    activeIndoorIndex?: number
}>(({ project, indoorImages, onPrev, onNext, activeIndoorIndex = 0 }, ref) => {
    const images = indoorImages ?? []
    const currentIndoor = images.length > 0 ? images[activeIndoorIndex] : project?.image

    return (
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-100 to-white group h-full" data-elem="tile">
            <div className="relative w-full aspect-[16/11] overflow-hidden">
                <div ref={ref} className="absolute inset-0">
                    {currentIndoor ? (
                        <Image
                            src={currentIndoor}
                            alt={`${project?.name} interior`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        project?.image && (
                            <Image
                                src={project.image}
                                alt={String(project.name)}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )
                    )}
                </div>

                {/* Navigation buttons */}
                {images.length > 0 && (
                    <>
                        <button
                            onClick={onPrev}
                            aria-label="Previous interior"
                            className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-900" viewBox="0 0 24 24" fill="none">
                                <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={onNext}
                            aria-label="Next interior"
                            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-900" viewBox="0 0 24 24" fill="none">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            <div className="p-4 md:p-5 bg-white">
                <h4 className="text-sm md:text-base font-bold text-slate-900">
                    {project?.name}
                </h4>
                {images.length > 0 && (
                    <div className="text-xs md:text-sm text-slate-600 mt-1.5 font-medium">
                        {activeIndoorIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>
    )
})

RightTopSlider.displayName = 'RightTopSlider'

function VideoCard({ video, name }: { video?: string | null; name?: string }) {
    function extractYouTubeId(url: string) {
        try {
            const u = new URL(url)
            if (u.hostname.includes("youtube.com")) return u.searchParams.get("v")
            if (u.hostname.includes("youtu.be")) return u.pathname.slice(1)
        } catch {
            return null
        }
        return null
    }

    const youTubeId = video ? extractYouTubeId(video) : null

    if (!video) {
        return (
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-100 to-white p-6 flex items-center justify-center h-full" data-elem="tile">
                <p className="text-sm text-slate-500">No tour available</p>
            </div>
        )
    }

    return (
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 group h-full" data-elem="tile">
            {youTubeId ? (
                <div className="relative w-full h-full min-h-[200px]">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${youTubeId}`}
                        title={`${name} — Video Tour`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <a href={video} target="_blank" rel="noreferrer" className="block h-full">
                    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-xs md:text-sm font-bold text-white">Video Tour</p>
                        </div>
                    </div>
                </a>
            )}
        </div>
    )
}

function InfoCard({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl h-full" data-elem="info">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600" />
            <div
                data-anim="glow"
                className="absolute inset-0 bg-gradient-to-br from-amber-300/40 via-transparent to-transparent rounded-2xl md:rounded-3xl"
            />
            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full min-h-[200px]">
                <div>
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none mb-3 md:mb-4">
                        {title}
                    </div>
                    <p className="text-xs md:text-sm text-white/95 whitespace-pre-line leading-relaxed">
                        {subtitle}
                    </p>
                </div>
                <div className="mt-6">
                    <button className="w-full md:w-auto inline-flex items-center justify-center bg-white text-slate-900 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm md:text-base">
                        View All
                        <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}