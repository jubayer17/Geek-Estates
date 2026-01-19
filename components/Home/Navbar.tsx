"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, User, MoreVertical, X } from "lucide-react"
import gsap from "gsap"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
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

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-[0_2px_30px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"
              }`}
          >
            {/* Logo */}
            <div
              ref={logoRef}
              className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-500 ${scrolled ? "text-[#1F4B43]" : "text-white"
                }`}
            >
              <span className="font-light">Geek</span>
              <span className="text-[#E7C873]">Estate</span>
            </div>

            {/* Desktop Links */}
            <div ref={linksRef} className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 py-2 group ${scrolled
                    ? "text-gray-600 hover:text-[#1F4B43]"
                    : "text-white/90 hover:text-white"
                    }`}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ease-out ${scrolled ? "bg-[#1F4B43]" : "bg-[#E7C873]"
                      }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div ref={actionsRef} className="hidden lg:flex items-center gap-5">
              <div className={`flex items-center gap-2 transition-colors duration-500 ${scrolled ? "text-gray-600" : "text-white/90"
                }`}>
                <Phone size={16} className="opacity-70" />
                <span className="text-sm font-medium">+880 1914 782 366</span>
              </div>

              <div className={`w-px h-6 ${scrolled ? "bg-gray-200" : "bg-white/20"}`} />

              <button
                className={`p-2 rounded-full transition-all duration-300 ${scrolled
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
                  }`}
              >
                <User size={20} />
              </button>

              <Button
                className="rounded-full px-6 py-5 text-sm font-semibold bg-[#E7C873] hover:bg-[#d9ba5f] text-gray-900 transition-all duration-300"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                Add Property
              </Button>
            </div>

            {/* Mobile Menu Button - 3-dot vertical ellipsis */}
            <button
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${scrolled
                ? "text-gray-900 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
                }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <MoreVertical size={24} />
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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Slide-in Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-white shadow-2xl"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="text-xl font-bold tracking-tight text-[#1F4B43]">
                <span className="font-light">Geek</span>
                <span className="text-[#E7C873]">Estate</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="px-6 py-8">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="menu-item flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:text-[#1F4B43] hover:bg-[#1F4B43]/5 transition-all duration-300 text-lg font-medium"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-100">
              <div className="menu-item flex items-center gap-3 text-gray-600 mb-4">
                <Phone size={18} />
                <span className="text-sm font-medium">+880 1914 782 366</span>
              </div>

              <Button
                className="menu-item w-full rounded-full py-6 text-base font-semibold bg-[#1F4B43] hover:bg-[#163832] text-white transition-all duration-300"
                onClick={closeMenu}
              >
                Add Property
              </Button>

              <p className="menu-item text-xs text-gray-400 text-center mt-4">
                © 2025 GeekEstate. All rights reserved.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
