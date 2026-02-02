"use client"

import { useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface FeaturedProject {
  id: string
  title: string
  location: string
  image: string
  category: string
}

interface FeaturedProjectsProps {
  projects: FeaturedProject[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite Grid Animation
      gsap.to(".bg-grid-pattern", {
        backgroundPosition: "100px 100px",
        duration: 20,
        repeat: -1,
        ease: "none"
      })

      // Move cursor follower
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" })
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" })

      // Label follower (slightly delayed for organic feel)
      const labelXTo = gsap.quickTo(cursorLabelRef.current, "x", { duration: 0.5, ease: "power3" })
      const labelYTo = gsap.quickTo(cursorLabelRef.current, "y", { duration: 0.5, ease: "power3" })

      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
        labelXTo(e.clientX)
        labelYTo(e.clientY)
      }

      window.addEventListener("mousemove", onMouseMove)

      // Initial entry animation for list items
      gsap.fromTo(".project-row",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      )

      return () => {
        window.removeEventListener("mousemove", onMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Handle hover states
  const handleMouseEnter = (index: number) => {
    setActiveProject(index)
    // Scale up cursor
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 })
    gsap.to(cursorLabelRef.current, { scale: 1, opacity: 1, duration: 0.3 })
  }

  const handleMouseLeave = () => {
    setActiveProject(null)
    // Scale down cursor
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 })
    gsap.to(cursorLabelRef.current, { scale: 0, opacity: 0, duration: 0.3 })
  }

  return (
    <section ref={containerRef} className="relative bg-neutral-950 text-white py-32 overflow-hidden cursor-default">

      {/* Infinite Animated Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] 
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] 
            [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
        />
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="w-full px-4 md:px-12 lg:px-20 max-w-[1920px] mx-auto z-10 relative">

        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <div>
            <span className="text-[#C5A059] font-mono text-xs tracking-[0.3em] uppercase block mb-4">
              Selected Works
            </span>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter">
              Featured <span className="font-serif italic text-neutral-500">Index</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-neutral-500 text-xs uppercase tracking-widest">
              2023 — 2024 Collection
            </span>
          </div>
        </div>

        {/* The List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-row group relative border-b border-white/10 transition-colors duration-500 hover:border-white/30"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/project-details" className="block w-full">
                <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between py-12 md:py-16 px-4">

                  {/* Left: Index & Title */}
                  <div className="flex items-baseline gap-8 md:gap-24">
                    <span className="font-mono text-xs text-neutral-600 group-hover:text-[#C5A059] transition-colors duration-300">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-4xl md:text-7xl font-light tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-8 transition-all duration-500 ease-out">
                      {project.title}
                    </h3>
                  </div>

                  {/* Right: Meta & Action */}
                  <div className="flex items-center gap-12 mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-right hidden md:block">
                      <span className="block text-xs uppercase tracking-widest text-neutral-400 mb-1">
                        {project.category}
                      </span>
                      <span className="block text-sm font-light text-neutral-300">
                        {project.location}
                      </span>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[#C5A059] transform group-hover:rotate-45 transition-transform duration-500" />
                  </div>

                </div>
              </Link>

              {/* Mobile Only Image (Static) */}
              <div className="md:hidden w-full h-64 mt-6 mb-8 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 group"
          >
            <span className="text-xs uppercase tracking-[0.2em]">View All Projects</span>
          </Link>
        </div>

      </div>

      {/* Desktop Cursor Follower Image */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[500px] h-[600px] pointer-events-none z-50 hidden md:block opacity-0 scale-0 origin-center -translate-x-1/2 -translate-y-1/2 shadow-2xl"
      >
        <div className="relative w-full h-full overflow-hidden bg-neutral-800">
          {/* We render all images but only show active one to avoid flicker */}
          {projects.map((project, index) => (
            <Image
              key={project.id}
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-500 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`}
              priority={index < 2} // Load first few
            />
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay" />
        </div>
      </div>

      {/* Cursor Label "View" */}
      <div
        ref={cursorLabelRef}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 mt-32 ml-32"
      >
        <div className="bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
          View Case
        </div>
      </div>

    </section>
  )
}
