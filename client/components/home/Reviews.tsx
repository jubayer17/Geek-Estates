"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "@/app/config";

gsap.registerPlugin(ScrollTrigger);

export type Testimonial = {
  id: string;                          // UUID
  content: string;                     // The testimonial text
  authorName: string;                  // Full name of the author
  authorInitial: string;               // Initial of the author
  authorTitle: string;                 // Role/title of the author
  authorLocation: string;              // Location of the author
  rating: number;                      // Star rating (e.g., 1–5)
  createdAt: string;                   // ISO timestamp
  updatedAt: string;                   // ISO timestamp
  propertyCategory: string;            // e.g., "Investment Property"
  propertyPurchaseValue?: number;      // Raw numeric value, optional
  propertyPurchaseValueDisplay?: string; // Display string like "$4.2M", optional
  propertyTitle: string;               // Title/name of the property
};


const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
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

  // Fetch testimonials
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`${config.base_url}/testimonial`);
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data: Testimonial[] = await res.json();
        setTestimonials(data);
      } catch (err: any) {
        console.error(err.message || "Error fetching testimonials");
      }
    }
    fetchTestimonials();
  }, []);

  // Auto-slide testimonials every 6 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      if (!isAnimating) {
        animateTransition((currentIndex + 1) % testimonials.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, testimonials, isAnimating]);

  // Animate transition to new testimonial
  const animateTransition = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
        animateIn(); // Animate in the new testimonial
      },
    });

    tl.to(circleRef.current, { scale: 0, rotation: 180, duration: 0.6, ease: "power2.in" })
      .to(
        orbRef.current,
        { x: -100, opacity: 0, rotation: -90, duration: 0.5, ease: "power1.in" },
        "<"
      )
      .to(leftPanelRef.current, { x: -50, opacity: 0, duration: 0.5, ease: "power2.in" }, "<0.1")
      .to(
        [quoteRef.current, nameRef.current, roleRef.current],
        { y: 30, opacity: 0, stagger: 0.08, duration: 0.4, ease: "power2.in" },
        "<"
      )
      .to(rightPanelRef.current, { rotateY: 90, opacity: 0, duration: 0.5, ease: "power2.in" }, "<0.15")
      .to(
        [propertyRef.current, valueRef.current, starsRef.current],
        { scale: 0.8, opacity: 0, stagger: 0.05, duration: 0.3, ease: "back.in(2)" },
        "<0.1"
      );
  };

  // Animate testimonial in
  const animateIn = () => {
    const tl = gsap.timeline();
    gsap.set([leftPanelRef.current, rightPanelRef.current], { opacity: 1 });
    gsap.set(rightPanelRef.current, { rotateY: 0 });

    tl.fromTo(
      circleRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.5)" }
    )
      .fromTo(
        orbRef.current,
        { x: 100, opacity: 0, rotation: 90 },
        { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: "power2.out" },
        "<0.2"
      )
      .fromTo(
        leftPanelRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "<0.1"
      )
      .fromTo(
        [quoteRef.current, nameRef.current, roleRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "<0.2"
      )
      .fromTo(
        rightPanelRef.current,
        { rotateY: -90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "<0.1"
      )
      .fromTo(
        [starsRef.current, propertyRef.current, valueRef.current],
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.5)" },
        "<0.2"
      );
  };

  // ScrollTrigger animations for header
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(sectionRef);
      gsap.set(selector('[data-anim="bg-letter"]'), { scale: 0, rotation: -45, opacity: 0 });
      gsap.set(selector('[data-anim="badge"]'), { opacity: 0, x: -20 });
      gsap.set(selector('[data-anim="title-line"]'), { yPercent: 100 });
      gsap.set(selector('[data-anim="desc"]'), { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(selector('[data-anim="bg-letter"]'), { scale: 1, rotation: 0, opacity: 0.05, duration: 1, stagger: 0.1, ease: "back.out(1.7)" })
        .to(selector('[data-anim="badge"]'), { opacity: 1, x: 0, duration: 0.8, ease: "back.out(2)" }, "-=0.8")
        .to(selector('[data-anim="title-line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "bounce.out" }, "-=0.8")
        .to(selector('[data-anim="desc"]'), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (testimonials.length === 0) {
    return (
      <div className="text-gray-400 text-center py-20">Loading testimonials...</div>
    );
  }

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-900 overflow-hidden py-20">
      {/* Header Section */}
      <div className="relative mb-16 md:mb-24 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
          <h2 className="text-[18vw] font-bold text-white leading-none tracking-tighter text-left flex">
            {"REVIEWS".split("").map((letter, i) => (
              <span key={i} data-anim="bg-letter" className="inline-block opacity-0">{letter}</span>
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
                <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.9]">Client</h2>
              </div>
              <div className="overflow-hidden md:pl-0 lg:ml-24">
                <h2 data-anim="title-line" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#E7C873] leading-[0.9]">
                  <span className="relative inline-block">Stories<span className="absolute -right-8 top-0 text-2xl md:text-4xl not-italic font-light text-[#E7C873]">*</span></span>
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

      {/* Main Testimonial Panel */}
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 mt-12 md:mt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Panel */}
        <div ref={leftPanelRef} className="relative">
          <div className="relative z-10 space-y-8">
            <div ref={circleRef} className="absolute -top-16 -left-16 w-32 h-32 border-4 border-amber-400/30 rounded-full"></div>
            <div ref={orbRef} className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-blue-400/20 rounded-full blur-xl"></div>
            <div ref={quoteRef} className="relative">
              <div className="text-8xl text-amber-400/20 font-serif absolute -top-8 -left-4">&quot;</div>
              <p className="text-2xl md:text-3xl text-gray-100 leading-relaxed font-light italic pl-8">{current.content}</p>
            </div>
            <div className="pl-8 space-y-3">
              <div ref={nameRef} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                  {current.authorInitial}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{current.authorName}</h3>
                </div>
              </div>
              <div ref={roleRef} className="pl-20">
                <p className="text-lg text-amber-300">{current.authorTitle}</p>
                <p className="text-sm text-gray-400 mt-1">{current.authorLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div ref={rightPanelRef} className="relative perspective-1000">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">
            {/* Stars */}
            <div ref={starsRef} className="flex gap-2 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 ${i < current.rating ? 'bg-amber-400' : 'bg-gray-600'}`}
                  style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
                />
              ))}
            </div>
            {/* Property Info */}
            <div className="space-y-6">
              <div ref={propertyRef}>
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Investment Property</p>
                <h4 className="text-3xl font-bold text-white">{current.propertyCategory}</h4>
              </div>
              {current.propertyPurchaseValue && (
                <div ref={valueRef} className="relative">
                  <div className="relative bg-gradient-to-r from-amber-400/10 to-transparent border-l-4 border-amber-400 pl-6 py-4">
                    <p className="text-sm text-gray-400 mb-1">Purchase Value</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                      {current.propertyPurchaseValueDisplay || `${current.propertyPurchaseValue} M`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-4 mt-16">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => !isAnimating && animateTransition(idx)}
            disabled={isAnimating}
            className={`transition-all duration-300 ${idx === currentIndex
              ? 'w-12 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full'
              : 'w-3 h-3 bg-white/30 rounded-full hover:bg-white/50'}`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
