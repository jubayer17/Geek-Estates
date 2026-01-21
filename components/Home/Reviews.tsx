"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
    id: number;
    name: string;
    role: string;
    location: string;
    image: string;
    rating: number;
    quote: string;
    property: string;
    purchaseValue?: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "James Thornton",
        role: "Founder & CEO, Thornton Group",
        location: "New York, USA",
        image: "/images/testimonials/james.jpg",
        rating: 5,
        quote: "From the first consultation to the final signature, the experience was nothing short of exceptional. Every detail was handled with precision and care.",
        property: "One Hyde Park Penthouse",
        purchaseValue: "$4.2M"
    },
    {
        id: 2,
        name: "Ayesha Rahman",
        role: "Managing Director, Rahman Holdings",
        location: "Dhaka, Bangladesh",
        image: "/images/testimonials/ayesha.jpg",
        rating: 5,
        quote: "They understood exactly what I was looking for. The team guided me through every step and delivered beyond my expectations.",
        property: "Gulshan Lake View Residence",
        purchaseValue: "$1.1M"
    },
    {
        id: 3,
        name: "Daniel Weber",
        role: "Investment Partner, Weber Capital",
        location: "Berlin, Germany",
        image: "/images/testimonials/daniel.jpg",
        rating: 4,
        quote: "Professional, transparent, and incredibly responsive. I felt confident making a high-value investment with their guidance.",
        property: "Central Park Skyline Apartment",
        purchaseValue: "$2.7M"
    },
    {
        id: 4,
        name: "Sophia Martinez",
        role: "Creative Director, Lumina Studio",
        location: "Barcelona, Spain",
        image: "/images/testimonials/sophia.jpg",
        rating: 5,
        quote: "The process was smooth and stress-free. Their market knowledge helped me secure a property I truly love.",
        property: "Mediterranean Sea View Villa",
        purchaseValue: "$3.5M"
    },
    {
        id: 5,
        name: "Omar Al-Fayed",
        role: "Chairman, Al-Fayed Developments",
        location: "Dubai, UAE",
        image: "/images/testimonials/omar.jpg",
        rating: 5,
        quote: "An elite level of service. Their attention to detail and negotiation skills are unmatched in the luxury real estate market.",
        property: "Palm Jumeirah Sky Mansion",
        purchaseValue: "$6.8M"
    }
];

const TestimonialsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLDivElement>(null);
    const propertyRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);

    const animateTransition = (newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            }
        });

        // Morphing circle animation
        tl.to(circleRef.current, {
            scale: 0,
            rotation: 180,
            duration: 0.6,
            ease: "power2.in"
        })
            .to(orbRef.current, {
                x: -100,
                opacity: 0,
                rotation: -90,
                duration: 0.5,
                ease: "power1.in"
            }, "<")
            .to(leftPanelRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "<0.1")
            .to([quoteRef.current, nameRef.current, roleRef.current], {
                y: 30,
                opacity: 0,
                stagger: 0.08,
                duration: 0.4,
                ease: "power2.in"
            }, "<")
            .to(rightPanelRef.current, {
                rotateY: 90,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "<0.15")
            .to([propertyRef.current, valueRef.current, starsRef.current], {
                scale: 0.8,
                opacity: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "back.in(2)"
            }, "<0.1");
    };

    const animateIn = () => {
        const tl = gsap.timeline();

        gsap.set([leftPanelRef.current, rightPanelRef.current], {
            opacity: 1
        });

        gsap.set(rightPanelRef.current, { rotateY: 0 });

        tl.fromTo(circleRef.current,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.5)" }
        )
            .fromTo(orbRef.current,
                { x: 100, opacity: 0, rotation: 90 },
                { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: "power2.out" },
                "<0.2"
            )
            .fromTo(leftPanelRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "<0.1"
            )
            .fromTo([quoteRef.current, nameRef.current, roleRef.current],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
                "<0.2"
            )
            .fromTo(rightPanelRef.current,
                { rotateY: -90, opacity: 0 },
                { rotateY: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                "<0.1"
            )
            .fromTo([starsRef.current, propertyRef.current, valueRef.current],
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.5)" },
                "<0.2"
            );
    };

    useEffect(() => {
        animateIn();
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            animateTransition(nextIndex);
        }, 6000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const current = testimonials[currentIndex];
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const selector = gsap.utils.selector(sectionRef);

            // Initial States for Header
            gsap.set(selector('[data-anim="bg-letter"]'), { scale: 0, rotation: -45, opacity: 0 });
            gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 });
            gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 });
            gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 });

            // Header Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(selector('[data-anim="bg-letter"]'), { scale: 1, rotation: 0, opacity: 0.05, duration: 1, stagger: 0.1, ease: "back.out(1.7)" })
                .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "back.out(2)" }, "-=0.8")
                .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "bounce.out" }, "-=0.8")
                .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-900 overflow-hidden py-20">
            {/* Header Section */}
            <div className="relative mb-16 md:mb-24 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
                {/* Background Big Text */}
                <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
                    <h2 className="text-[18vw] font-bold text-white leading-none tracking-tighter text-left flex">
                        {"REVIEWS".split("").map((letter, i) => (
                            <span key={i} data-anim="bg-letter" className="inline-block opacity-0">
                                {letter}
                            </span>
                        ))}
                    </h2>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-20 pt-10">
                    <div className="flex-1">
                        <div className="flex items-center ml-0 md:ml-4 gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-[#E7C873]"></span>
                            <span data-anim="badge" className="text-[#E7C873] font-medium tracking-[0.3em] uppercase text-sm">Testimonials</span>
                        </div>

                        <div className="relative left-0 md:left-4">
                            <div className="overflow-hidden">
                                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]">
                                    Client
                                </h2>
                            </div>
                            <div className="overflow-hidden md:pl-0 lg:ml-24">
                                <h2 data-anim="title-line" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-[#E7C873] leading-[0.9]">
                                    <span className="relative inline-block">
                                        Stories
                                        <span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span>
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="lg:max-w-md pb-4">
                        <p data-anim="desc" className="text-white/70 text-lg leading-relaxed border-l border-white/20 pl-6">
                            Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
                        </p>
                    </div>
                </div>
            </div>

            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
                {/* Main Content - Split Panel Design */}
                <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Panel - Quote Section */}
                    <div ref={leftPanelRef} className="relative">
                        <div className="relative z-10 space-y-8">

                            {/* Decorative Circle */}
                            <div ref={circleRef} className="absolute -top-16 -left-16 w-32 h-32 border-4 border-amber-400/30 rounded-full"></div>

                            {/* Floating Orb */}
                            <div ref={orbRef} className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-blue-400/20 rounded-full blur-xl"></div>

                            {/* Quote */}
                            <div ref={quoteRef} className="relative">
                                <div className="text-8xl text-amber-400/20 font-serif absolute -top-8 -left-4">&quot;</div>
                                <p className="text-2xl md:text-3xl text-gray-100 leading-relaxed font-light italic pl-8">
                                    {current.quote}
                                </p>
                            </div>

                            {/* Name & Role */}
                            <div className="pl-8 space-y-3">
                                <div ref={nameRef} className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {current.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white">{current.name}</h3>
                                    </div>
                                </div>
                                <div ref={roleRef} className="pl-20">
                                    <p className="text-lg text-amber-300">{current.role}</p>
                                    <p className="text-sm text-gray-400 mt-1">{current.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Property Details */}
                    <div ref={rightPanelRef} className="relative perspective-1000">
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">

                            {/* Geometric decorations */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-tr-full"></div>

                            {/* Stars */}
                            <div ref={starsRef} className="flex gap-2 mb-8">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 ${i < current.rating
                                            ? 'bg-amber-400'
                                            : 'bg-gray-600'
                                            }`}
                                        style={{
                                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Property Info */}
                            <div className="space-y-6">
                                <div ref={propertyRef}>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Investment Property</p>
                                    <h4 className="text-3xl font-bold text-white">{current.property}</h4>
                                </div>

                                {current.purchaseValue && (
                                    <div ref={valueRef} className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent blur-xl"></div>
                                        <div className="relative bg-gradient-to-r from-amber-400/10 to-transparent border-l-4 border-amber-400 pl-6 py-4">
                                            <p className="text-sm text-gray-400 mb-1">Purchase Value</p>
                                            <p className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                                                {current.purchaseValue}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Progress indicator */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex gap-2">
                                    {testimonials.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => !isAnimating && animateTransition(idx)}
                                            className="relative h-1 flex-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer"
                                            disabled={isAnimating}
                                        >
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 transition-transform duration-300 ${idx === currentIndex ? 'scale-x-100' : 'scale-x-0'
                                                    } origin-left`}
                                            ></div>
                                            <div className="absolute inset-0 bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation Dots */}
                <div className="flex justify-center gap-4 mt-16">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => !isAnimating && animateTransition(idx)}
                            disabled={isAnimating}
                            className={`transition-all duration-300 ${idx === currentIndex
                                ? 'w-12 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full'
                                : 'w-3 h-3 bg-white/30 rounded-full hover:bg-white/50'
                                }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default TestimonialsSection;
