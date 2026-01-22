"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, User, MoreVertical, X, ArrowUpRight } from "lucide-react"
import gsap from "gsap"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutUs", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/allProject", label: "Properties" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Handle scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Initial load animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar fade in from top
      gsap.fromTo(navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      )

      // Logo fade in
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
      )

      // Links stagger animation
      if (linksRef.current) {
        const links = linksRef.current.children
        gsap.fromTo(links,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.9, ease: "power3.out" }
        )
      }

      // Actions fade in from right
      gsap.fromTo(actionsRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 1.1, ease: "power3.out" }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (open) {
      // Animate overlay
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        )
      }

      // Animate menu panel
      if (mobileMenuRef.current) {
        gsap.fromTo(mobileMenuRef.current,
          { x: "100%", opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        )

        // Animate menu items with stagger
        const items = mobileMenuRef.current.querySelectorAll(".menu-item")
        gsap.fromTo(items,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, delay: 0.2, ease: "power3.out" }
        )
      }
    }
  }, [open])

  // Close menu animation
  const closeMenu = () => {
    if (overlayRef.current && mobileMenuRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setOpen(false)
      })

      tl.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.2")
    } else {
      setOpen(false)
    }
  }

  // Hover animation handlers
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      y: -2,
      boxShadow: "0 10px 30px rgba(231, 200, 115, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 0px 0px rgba(231, 200, 115, 0)",
      duration: 0.3,
      ease: "power2.out"
    })
  }

  // Styles based on scroll and page
  const isDarkText = scrolled || !isHome
  const navBgClass = (scrolled || !isHome)
    ? "bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
    : "bg-transparent"

  // Position based on page
  const positionClass = isHome ? "fixed" : "sticky"

  // Premium Golden Border
  const borderClass = scrolled
    ? "border-b-[3px] border-[#E7C873]/80"
    : "border-b border-transparent"

  return (
    <>
      <nav
        ref={navRef}
        className={`${positionClass} top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${navBgClass} ${borderClass}`}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-20 lg:h-24" : "h-24 lg:h-32"
              }`}
          >
            {/* Logo */}
            <div
              ref={logoRef}
              className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-500 ${isDarkText ? "text-[#1F4B43]" : "text-white"
                }`}
            >
              <span className="font-light tracking-tighter">Geek</span>
              <span className="text-[#E7C873] font-serif italic">Estate</span>
            </div>

            {/* Desktop Links */}
            <div ref={linksRef} className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-base font-medium tracking-wide transition-all duration-300 py-2 group ${isDarkText
                    ? "text-gray-600 hover:text-[#1F4B43]"
                    : "text-white/90 hover:text-white"
                    }`}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500 ease-out ${isDarkText ? "bg-[#1F4B43]" : "bg-[#E7C873]"
                      }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div ref={actionsRef} className="hidden lg:flex items-center gap-8">
              <div className={`flex items-center gap-3 transition-colors duration-500 ${isDarkText ? "text-gray-600" : "text-white/90"
                }`}>
                <Phone size={18} className="opacity-80" />
                <span className="text-sm font-medium tracking-wide">+880 1914 782 366</span>
              </div>

              <div className={`w-px h-8 ${isDarkText ? "bg-gray-200" : "bg-white/20"}`} />

              <button
                className={`p-3 rounded-full transition-all duration-300 ${isDarkText
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
                  }`}
              >
                <User size={22} />
              </button>

              <Button
                className="rounded-full px-10 py-7 text-base font-bold tracking-widest uppercase bg-[#E7C873] hover:bg-[#d9ba5f] text-gray-900 transition-all duration-300 shadow-lg hover:shadow-[#E7C873]/40"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                Add Property
              </Button>
            </div>

            {/* Mobile Menu Button - Premium Hamburger */}
            <button
              className={`lg:hidden p-2 rounded-full transition-all duration-300 group ${isDarkText
                ? "text-gray-900 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
                }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <span className={`h-0.5 rounded-full transition-all duration-300 w-8 ${isDarkText ? "bg-gray-900" : "bg-white"}`} />
                <span className={`h-0.5 rounded-full transition-all duration-300 w-6 group-hover:w-8 ${isDarkText ? "bg-gray-900" : "bg-white"}`} />
                <span className={`h-0.5 rounded-full transition-all duration-300 w-4 group-hover:w-8 ${isDarkText ? "bg-gray-900" : "bg-white"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Panel */}
      {open && (
        <>
          {/* Backdrop overlay with blur */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
            onClick={closeMenu}
          />

          {/* Slide-in Menu Panel - Wider & Elegant */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[450px] bg-white shadow-2xl flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
              <div className="text-2xl font-bold tracking-tight text-[#1F4B43]">
                <span className="font-light tracking-tighter">Geek</span>
                <span className="text-[#E7C873] font-serif italic">Estate</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 px-8 py-10 overflow-y-auto">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="menu-item group flex items-center justify-between text-3xl font-light text-slate-800 hover:text-[#E7C873] transition-colors duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="font-serif italic group-hover:pl-4 transition-all duration-300">{link.label}</span>
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="p-8 bg-gray-50/50 border-t border-gray-100">
              <div className="menu-item flex flex-col gap-6">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-[#E7C873]/10 flex items-center justify-center text-[#E7C873]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-lg font-medium text-gray-900">+880 1914 782 366</p>
                  </div>
                </div>

                <Button
                  className="w-full rounded-full py-7 text-base font-bold tracking-widest uppercase bg-[#1F4B43] hover:bg-[#163832] text-white shadow-lg shadow-[#1F4B43]/20 transition-all duration-300"
                  onClick={closeMenu}
                >
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
