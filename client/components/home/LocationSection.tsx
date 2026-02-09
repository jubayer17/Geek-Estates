"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import config from "@/app/config"

gsap.registerPlugin(ScrollTrigger)

type OpeningHour = {
  id: string;
  contactInfoId: string;
  days: string;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

type ContactInfo = {
  id: string;
  fullAddress: string;
  country: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  openingHours: OpeningHour[];
};

export default function LocationSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch contact info
  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const res = await fetch(`${config.base_url}/contactInfo`)
        if (!res.ok) throw new Error("Failed to fetch contact info")
        const data: ContactInfo = await res.json()
        setContactInfo(data)
      } catch (err: any) {
        setError(err.message || "Error fetching contact info")
      }
    }
    fetchContactInfo()
  }, [])

  // GSAP Animations
  useEffect(() => {
    if (!rootRef.current) return

    const context = gsap.context(() => {
      const selector = gsap.utils.selector(rootRef)

      // Initial states
      gsap.set(selector('[data-anim="bg-letter"]'), { y: 100, skewY: 10, opacity: 0 })
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 })
      gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 })
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 })
      gsap.set(selector('[data-anim="map-container"]'), { opacity: 0, y: 50 })
      gsap.set(selector('[data-anim="details-item"]'), { opacity: 0, y: 30 })

      // Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(selector('[data-anim="bg-letter"]'), { y: 0, skewY: 0, opacity: 0.03, duration: 1.2, stagger: 0.05, ease: "power3.out" })
        .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=1.0")
        .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "sine.out" }, "-=0.8")
        .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(selector('[data-anim="map-container"]'), { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, "-=0.6")
        .to(selector('[data-anim="details-item"]'), { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: "power3.out" }, "-=1.0")
    }, rootRef)

    return () => context.revert()
  }, [])

  // Error or Loading states
  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error}</div>

  if (!contactInfo)
    return <div className="text-gray-400 text-center py-10">Loading contact info...</div>

  return (
    <section ref={rootRef} className="py-20 md:py-32 bg-white overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="relative mb-16 md:mb-24">
          <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
            <h2 className="text-[16vw] font-bold text-slate-900 leading-none tracking-tighter text-left flex">
              {"CONTACT".split("").map((letter, i) => (
                <span key={i} data-anim="bg-letter" className="inline-block opacity-0">{letter}</span>
              ))}
            </h2>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-20 pt-10">
            <div className="flex-1">
              <div className="flex items-center ml-0 md:ml-4 gap-4 mb-8">
                <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Headquarters</span>
              </div>
              <div className="relative left-0 md:left-4">
                <div className="overflow-hidden">
                  <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight leading-[0.9]">Our</h2>
                </div>
                <div className="overflow-hidden md:pl-0 lg:ml-24">
                  <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-slate-800 leading-[0.9]">
                    <span className="relative inline-block">
                      Office
                      <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="lg:max-w-md pb-4">
              <p data-anim="desc" className="text-slate-600 text-lg leading-relaxed border-l border-slate-300 pl-6">
                Experience our world-class service in person. Located in the heart of the city, our office is designed to welcome you with elegance and warmth.
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div data-anim="map-container" className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1647526384501!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-2xl"></div>
        </div>

        {/* Details Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-l border-slate-200">
          {/* Address */}
          <div data-anim="details-item" className="group flex flex-col items-center text-center p-12 border-r border-b border-slate-200 hover:bg-slate-50 transition-all duration-500 relative">
            <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#E7C873] transition-all duration-500 group-hover:w-full z-10"></div>
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#E7C873] group-hover:border-[#E7C873] transition-all duration-500 mb-8 bg-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium uppercase tracking-widest text-slate-900 mb-4 group-hover:text-[#E7C873] transition-colors">Address</h3>
            <p className="text-slate-500 text-base leading-relaxed font-light">
              {contactInfo.fullAddress}<br />{contactInfo.country}
            </p>
          </div>

          {/* Contact */}
          <div data-anim="details-item" className="group flex flex-col items-center text-center p-12 border-r border-b border-slate-200 hover:bg-slate-50 transition-all duration-500 relative">
            <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#E7C873] transition-all duration-500 group-hover:w-full z-10"></div>
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#E7C873] group-hover:border-[#E7C873] transition-all duration-500 mb-8 bg-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium uppercase tracking-widest text-slate-900 mb-4 group-hover:text-[#E7C873] transition-colors">Contact</h3>
            <div className="flex flex-col gap-2">
              <a href={`tel:${contactInfo.phone}`} className="text-slate-500 hover:text-[#E7C873] transition-colors text-base font-light">{contactInfo.phone}</a>
              <a href={`mailto:${contactInfo.email}`} className="text-slate-500 hover:text-[#E7C873] transition-colors text-base font-light">{contactInfo.email}</a>
            </div>
          </div>

          {/* Opening Hours */}
          <div data-anim="details-item" className="group flex flex-col items-center text-center p-12 border-r border-b border-slate-200 hover:bg-slate-50 transition-all duration-500 relative">
            <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#E7C873] transition-all duration-500 group-hover:w-full z-10"></div>
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#E7C873] group-hover:border-[#E7C873] transition-all duration-500 mb-8 bg-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium uppercase tracking-widest text-slate-900 mb-4 group-hover:text-[#E7C873] transition-colors">Opening Hours</h3>
            <ul className="space-y-2 text-slate-500 text-sm font-light w-full">
              {contactInfo.openingHours.map(hour => (
                <li key={hour.id} className="flex justify-between border-b border-slate-100 pb-2 border-dashed">
                  <span>{hour.days}</span>
                  {hour.isClosed ? <span className="text-[#E7C873]">Closed</span> : <span className="font-normal text-slate-700">{hour.openTime} - {hour.closeTime}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
