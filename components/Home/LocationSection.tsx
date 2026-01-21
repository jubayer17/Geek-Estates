"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LocationSection() {
    const rootRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!rootRef.current) return

        const context = gsap.context(() => {
            const selector = gsap.utils.selector(rootRef)

            // Initial states
            gsap.set(selector('[data-anim="header-bg"]'), { yPercent: 10, opacity: 0 })
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
                    toggleActions: "play none none reverse"
                }
            })

            tl.to(selector('[data-anim="header-bg"]'), { yPercent: 0, opacity: 0.03, duration: 1.5, ease: "power2.out" })
                .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=1.2")
                .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "sine.out" }, "-=1.0")
                .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
                .to(selector('[data-anim="map-container"]'), {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power3.out"
                }, "-=0.6")
                .to(selector('[data-anim="details-item"]'), {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=1.0")

        }, rootRef)

        return () => context.revert()
    }, [])

    return (
        <section ref={rootRef} className="py-20 md:py-32 bg-white overflow-hidden relative">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="relative mb-16 md:mb-24">
                    {/* Background Big Text */}
                    <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                        <h2 data-anim="header-bg" className="text-[18vw] font-bold text-slate-900 leading-none opacity-0 tracking-tighter text-left">
                            CONTACT
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
                                    <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-slate-900 tracking-tight leading-[0.9]">
                                        Our
                                    </h2>
                                </div>
                                <div className="overflow-hidden pl-4 md:pl-0 lg:ml-24">
                                    <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-slate-800 leading-[0.9]">
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

                {/* Content Container */}
                <div className="flex flex-col gap-12 lg:gap-16">

                    {/* Map Container - Full Width, No Shadow */}
                    <div
                        data-anim="map-container"
                        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden relative group"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1647526384501!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>

                        {/* Overlay for inactive state */}
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                    </div>

                    {/* Details Container - Grid Layout below Map */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">

                        {/* Address */}
                        <div data-anim="details-item" className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#E7C873] mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-light text-slate-900 mb-3">Office Address</h3>
                            <div className="w-12 h-0.5 bg-[#E7C873] mb-4"></div>
                            <p className="text-slate-600 text-lg leading-relaxed font-light">
                                123 Luxury Avenue, Suite 500<br />
                                Manhattan, NY 10001<br />
                                United States
                            </p>
                        </div>

                        {/* Contact */}
                        <div data-anim="details-item" className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#E7C873] mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-light text-slate-900 mb-3">Contact Us</h3>
                            <div className="w-12 h-0.5 bg-[#E7C873] mb-4"></div>
                            <div className="flex flex-col gap-2">
                                <a href="tel:+12125550123" className="text-slate-600 hover:text-[#E7C873] transition-colors text-lg font-light">
                                    +1 (212) 555-0123
                                </a>
                                <a href="mailto:contact@geekrealestate.com" className="text-slate-600 hover:text-[#E7C873] transition-colors text-lg font-light">
                                    contact@geekrealestate.com
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div data-anim="details-item" className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#E7C873] mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-light text-slate-900 mb-3">Business Hours</h3>
                            <div className="w-12 h-0.5 bg-[#E7C873] mb-4"></div>
                            <ul className="space-y-2 text-slate-600 text-lg font-light w-full max-w-xs">
                                <li className="flex justify-between border-b border-slate-200 pb-2 border-dashed">
                                    <span>Mon - Fri</span>
                                    <span className="font-normal text-slate-800">9:00 AM - 6:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-200 pb-2 border-dashed">
                                    <span>Saturday</span>
                                    <span className="font-normal text-slate-800">10:00 AM - 4:00 PM</span>
                                </li>
                                <li className="flex justify-between pb-2">
                                    <span>Sunday</span>
                                    <span className="text-[#E7C873]">Closed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
