"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { craftedSpacesProjects, craftedSpacesCategories } from '@/lib/data/craftedSpacesData'

gsap.registerPlugin(ScrollTrigger)

export default function CraftedSpaces() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [filteredProjects, setFilteredProjects] = useState(craftedSpacesProjects)
    const [isAnimating, setIsAnimating] = useState(false)

    const sectionRef = useRef<HTMLElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const categoriesRef = useRef<HTMLDivElement>(null)
    const slideshowRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])

    // Filter projects by category
    const filterProjects = useCallback((category: string) => {
        if (category === "All") {
            return craftedSpacesProjects
        }
        return craftedSpacesProjects.filter(p => p.category === category)
    }, [])

    // Handle category change with animation
    const handleCategoryChange = useCallback((category: string) => {
        if (category === activeCategory || isAnimating) return

        setIsAnimating(true)
        const track = trackRef.current

        if (track) {
            gsap.to(track, {
                opacity: 0,
                scale: 0.97,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    setActiveCategory(category)
                    setFilteredProjects(filterProjects(category))
                    setCurrentIndex(0)

                    // Reset track position
                    gsap.set(track, { x: 0 })

                    gsap.to(track, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        onComplete: () => setIsAnimating(false)
                    })
                }
            })
        }
    }, [activeCategory, isAnimating, filterProjects])

    // Navigate slideshow - smooth horizontal sliding with synchronized size changes
    const navigate = useCallback((direction: 'prev' | 'next') => {
        if (isAnimating || filteredProjects.length <= 3) return

        setIsAnimating(true)
        const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
        const images = imageRefs.current.filter(Boolean) as HTMLDivElement[]
        const slideshowEl = slideshowRef.current

        if (!slideshowEl || slides.length < 3 || images.length < 3) {
            setIsAnimating(false)
            return
        }

        const newIndex = direction === 'next'
            ? (currentIndex + 1) % filteredProjects.length
            : (currentIndex - 1 + filteredProjects.length) % filteredProjects.length

        const slideWidth = slides[0].offsetWidth
        const gap = window.innerWidth >= 1024 ? 24 : window.innerWidth >= 768 ? 20 : 16
        const moveDistance = slideWidth + gap

        const centerHeight = window.innerWidth >= 1280 ? 580 : window.innerWidth >= 1024 ? 520 : window.innerWidth >= 768 ? 420 : 320
        const sideHeight = window.innerWidth >= 1280 ? 520 : window.innerWidth >= 1024 ? 460 : window.innerWidth >= 768 ? 380 : 320

        const duration = 0.85
        const ease = "sine.inOut"

        const tl = gsap.timeline({
            onComplete: () => {
                // commit index and finish
                setCurrentIndex(newIndex)
                setIsAnimating(false)
            }
        })

        // --- keep your existing left/center/right slide animations unchanged (exact timing)
        if (direction === 'next') {
            // Left exits
            tl.to(slides[0], { x: -moveDistance, opacity: 0, duration, ease }, 0)
            tl.to(images[0], { height: sideHeight, duration, ease }, 0)

            // Center -> left
            tl.to(slides[1], { x: -moveDistance, opacity: 0.6, duration, ease }, 0)
            tl.to(images[1], { height: sideHeight, duration, ease }, 0)

            // Right -> center
            tl.to(slides[2], { x: -moveDistance, opacity: 1, duration, ease }, 0)
            tl.to(images[2], { height: centerHeight, duration, ease }, 0)
        } else {
            // prev flow (unchanged)
            tl.to(slides[0], { x: moveDistance, opacity: 1, duration, ease }, 0)
            tl.to(images[0], { height: centerHeight, duration, ease }, 0)

            tl.to(slides[1], { x: moveDistance, opacity: 0.6, duration, ease }, 0)
            tl.to(images[1], { height: sideHeight, duration, ease }, 0)

            tl.to(slides[2], { x: moveDistance, opacity: 0, duration, ease }, 0)
            tl.to(images[2], { height: sideHeight, duration, ease }, 0)
        }

        // --- create a visual clone that EXACTLY matches the image container geometry ---
        if (direction === 'next') {
            // incoming project that WILL occupy the right slot after nav
            const incomingIndex = (currentIndex + 3) % filteredProjects.length
            const incomingProject = filteredProjects[incomingIndex]

            if (incomingProject) {
                // use the CURRENT right slot's image container geometry as our reference
                const imageEl = images[2] // this is the current right image container element (ref)
                const imageRect = imageEl.getBoundingClientRect()
                const containerRect = slideshowEl.getBoundingClientRect()

                // compute exact geometry relative to slideshow container
                const cloneLeft = imageRect.left - containerRect.left
                const cloneTop = imageRect.top - containerRect.top
                const cloneWidth = imageRect.width
                const cloneHeight = imageRect.height

                const clone = document.createElement('div')
                clone.className = 'crafted-visual-clone'
                // place clone in slideshow container coordinate space
                clone.style.position = 'absolute'
                clone.style.left = `${cloneLeft}px`
                clone.style.top = `${cloneTop}px`
                clone.style.width = `${cloneWidth}px`
                clone.style.height = `${cloneHeight}px`
                clone.style.overflow = 'hidden'
                clone.style.pointerEvents = 'none'
                clone.style.zIndex = '40'
                clone.style.boxSizing = 'border-box'
                clone.style.willChange = 'transform, opacity'

                // incoming project's image src (supports imported modules or string)
                const imgSrc = (typeof incomingProject.image === 'object' && 'src' in incomingProject.image)
                    ? (incomingProject.image as { src: string }).src
                    : incomingProject.image

                // only render the image area here (NO extra padding/text) so size matches exactly
                clone.innerHTML = `
        <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;display:block" />
      `

                slideshowEl.appendChild(clone)

                // place clone exactly at the RIGHT start position (i.e. shifted right by moveDistance)
                // because clone is positioned relative to slideshow container, translateX by moveDistance moves it
                gsap.set(clone, { x: moveDistance, y: 0, opacity: 0, scale: 1 })

                // animate the clone horizontally into place at the same timeline slot (0)
                // this ensures perfect sync with left/center animations
                tl.to(clone, {
                    x: 0,
                    opacity: 1,
                    duration,
                    ease,
                    onComplete: () => {
                        // remove clone cleanly after the timeline finishes
                        if (clone.parentNode) clone.parentNode.removeChild(clone)
                    }
                }, 0)
            }
        }

        // --- mirror for prev: incoming left should come from exact left position (symmetric) ---
        if (direction === 'prev') {
            const incomingIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length
            const incomingProject = filteredProjects[incomingIndex]

            if (incomingProject) {
                const imageEl = images[0] // current left image container (we'll use its geometry)
                const imageRect = imageEl.getBoundingClientRect()
                const containerRect = slideshowEl.getBoundingClientRect()

                const cloneLeft = imageRect.left - containerRect.left
                const cloneTop = imageRect.top - containerRect.top
                const cloneWidth = imageRect.width
                const cloneHeight = imageRect.height

                const clone = document.createElement('div')
                clone.className = 'crafted-visual-clone'
                clone.style.position = 'absolute'
                clone.style.left = `${cloneLeft}px`
                clone.style.top = `${cloneTop}px`
                clone.style.width = `${cloneWidth}px`
                clone.style.height = `${cloneHeight}px`
                clone.style.overflow = 'hidden'
                clone.style.pointerEvents = 'none'
                clone.style.zIndex = '40'
                clone.style.boxSizing = 'border-box'
                clone.style.willChange = 'transform, opacity'

                const imgSrc = (typeof incomingProject.image === 'object' && 'src' in incomingProject.image)
                    ? (incomingProject.image as { src: string }).src
                    : incomingProject.image

                clone.innerHTML = `
        <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;display:block" />
      `

                slideshowEl.appendChild(clone)

                // place clone left-of-slot
                gsap.set(clone, { x: -moveDistance, y: 0, opacity: 0, scale: 1 })

                tl.to(clone, {
                    x: 0,
                    opacity: 1,
                    duration,
                    ease,
                    onComplete: () => {
                        if (clone.parentNode) clone.parentNode.removeChild(clone)
                    }
                }, 0)
            }
        }

    }, [currentIndex, filteredProjects, isAnimating, slideshowRef])


    // Scroll-triggered entrance animation
    useEffect(() => {
        const section = sectionRef.current
        const heading = headingRef.current
        const subtitle = subtitleRef.current
        const categoriesEl = categoriesRef.current
        const slideshow = slideshowRef.current

        if (!section || !heading || !subtitle || !categoriesEl || !slideshow) return

        // Get the decorative elements
        const headerContainer = heading.parentElement
        const decorativeLine = headerContainer?.querySelector('.flex.items-center.justify-center')

        // Set initial states with elegant starting positions
        if (decorativeLine) {
            gsap.set(decorativeLine, { opacity: 0, y: 20, scale: 0.9 })
        }
        gsap.set(heading, { opacity: 0, y: 60, filter: 'blur(8px)' })
        gsap.set(subtitle, { opacity: 0, y: 40 })
        gsap.set(categoriesEl.children, { opacity: 0, y: 30 })
        gsap.set(slideshow, { opacity: 0, y: 50 })

        // Create scroll-triggered timeline with elegant animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none none",
            }
        })

        tl
            // Decorative line fades in first
            .to(decorativeLine || {}, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            })
            // Title fades in with blur effect
            .to(heading, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.1,
                ease: "power3.out"
            }, "-=0.5")
            // Subtitle follows with elegant timing
            .to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out"
            }, "-=0.6")
            // Category cards stagger in elegantly
            .to(categoriesEl.children, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power2.out"
            }, "-=0.4")
            // Slideshow container fades in
            .to(slideshow, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.3")

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="py-16 bg-[#FAFAFA]"
        >
            <div className="max-w-450 mx-auto px-4 sm:px-6 lg:px-12">

                {/* Section Header - Premium & Elegant */}
                <div className="text-center mb-14 md:mb-18 lg:mb-24">
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
                        <span className="h-px w-8 md:w-12 bg-linear-to-r from-transparent to-[#E7C873]"></span>
                        <span className="text-[#E7C873] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
                            Portfolio
                        </span>
                        <span className="h-px w-8 md:w-12 bg-linear-to-l from-transparent to-[#E7C873]"></span>
                    </div>

                    <h2
                        ref={headingRef}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-light text-gray-900 tracking-tight mb-5 md:mb-7 leading-[1.1]"
                    >
                        Crafted Spaces of{' '}
                        <span className="relative inline-block">
                            <span className="font-medium bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                Distinction
                            </span>
                            <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#E7C873] to-transparent"></span>
                        </span>
                    </h2>

                    <p
                        ref={subtitleRef}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed px-4 font-light"
                    >
                        Explore our portfolio of meticulously designed properties, each representing
                        <span className="text-gray-700 font-normal"> the pinnacle of architectural excellence </span>
                        and refined living.
                    </p>
                </div>

                {/* Category Filter Cards */}
                <div
                    ref={categoriesRef}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-10 md:mb-14 lg:mb-16"
                >
                    {craftedSpacesCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`
                                px-5 sm:px-7 md:px-9 lg:px-11 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase
                                transition-all duration-500 border
                                ${activeCategory === category
                                    ? 'bg-[#E7C873] text-gray-900 border-[#E7C873] shadow-lg shadow-[#E7C873]/20'
                                    : 'bg-white/80 text-gray-600 border-gray-200 hover:border-[#E7C873] hover:text-gray-900 hover:shadow-md'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Slideshow Container */}
                <div
                    ref={slideshowRef}
                    className="relative"
                >
                    {/* Navigation Arrows */}
                    {filteredProjects.length > 3 && (
                        <>
                            <button
                                onClick={() => navigate('prev')}
                                disabled={isAnimating}
                                className="absolute left-0 top-[35%] md:top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 lg:-translate-x-6 z-10 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-white transition-all duration-300 disabled:opacity-50"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={() => navigate('next')}
                                disabled={isAnimating}
                                className="absolute right-0 top-[35%] md:top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 lg:translate-x-6 z-10 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-white transition-all duration-300 disabled:opacity-50"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </>
                    )}

                    {/* Slides - Horizontal sliding carousel */}
                    <div className="overflow-hidden px-6 sm:px-10 md:px-14 lg:px-16">
                        <div
                            ref={trackRef}
                            className="flex items-end gap-4 md:gap-5 lg:gap-6"
                        >
                            {/* Render 3 visible slides based on currentIndex - all equal width */}
                            {[0, 1, 2].map((offset) => {
                                const projectIndex = (currentIndex + offset) % filteredProjects.length
                                const project = filteredProjects[projectIndex]
                                if (!project) return null

                                const isCenter = offset === 1
                                return (
                                    <div
                                        key={`slide-${currentIndex}-${offset}`}
                                        ref={(el) => { slideRefs.current[offset] = el }}
                                        className={`
                                            group flex-1 min-w-0
                                            ${isCenter ? 'z-10' : 'opacity-60'}
                                        `}
                                        style={{ willChange: 'transform, opacity' }}
                                    >
                                        {/* Image Container - only height differs */}
                                        <div
                                            ref={(el) => { imageRefs.current[offset] = el }}
                                            className={`
                                                relative overflow-hidden bg-gray-100
                                                ${isCenter
                                                    ? 'h-70 sm:h-80 md:h-105 lg:h-130 xl:h-145'
                                                    : 'h-70 sm:h-80 md:h-95 lg:h-115 xl:h-130'
                                                }
                                            `}
                                            style={{ willChange: 'height' }}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                priority={isCenter}
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Project Info */}
                                        <div className="pt-4 md:pt-5 lg:pt-6 pb-2">
                                            <h3 className="font-semibold text-gray-900 tracking-tight mb-1 md:mb-1.5 text-base sm:text-lg md:text-xl lg:text-2xl">
                                                {project.name}
                                            </h3>
                                            <div className='flex flex-row'>
                                                <p className="text-xs mr-3 sm:text-sm hover:text-black text-gray-400 uppercase mt-0.5 tracking-widest font-medium">
                                                    {project.category}
                                                </p>
                                                {" "}
                                                |
                                                {" "}
                                                <p className="text-xs ml-3 mt-0.5 hover:text-black sm:text-sm text-gray-400 uppercase tracking-widest font-medium">
                                                    {project.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    {filteredProjects.length > 3 && (
                        <div className="flex justify-center gap-2 mt-8 md:mt-10 lg:mt-12">
                            {filteredProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (!isAnimating && index !== currentIndex) {
                                            // Navigate step by step to the target index
                                            const direction = index > currentIndex ? 'next' : 'prev'
                                            navigate(direction)
                                        }
                                    }}
                                    className={`
                                        h-0.5 transition-all duration-500
                                        ${index === currentIndex
                                            ? 'w-8 md:w-10 bg-[#E7C873]'
                                            : 'w-4 md:w-5 bg-gray-300 hover:bg-gray-400'
                                        }
                                    `}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12 md:mt-16 lg:mt-20">
                    <button className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border border-gray-900 text-gray-900 text-sm sm:text-base font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300">
                        <span>View All Projects</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </section>
    )
}
