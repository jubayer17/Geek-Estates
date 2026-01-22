"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AllPropertiesBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Image Reveal (Clip Path Animation - Premium Feel)
      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "expo.inOut",
        }
      )
        .from(
          imageRef.current,
          { scale: 1.2, duration: 1.8, ease: "power2.out" },
          "-=1.2"
        )
        // 2. Typography Reveal
        .from(
          titleRef.current,
          { y: 100, opacity: 0, duration: 1, skewY: 2 },
          "-=1"
        )
        .from(
          contentRef.current,
          { y: 50, opacity: 0, duration: 1 },
          "-=0.8"
        )
        .from(
          statsRef.current?.children || [],
          { y: 30, opacity: 0, stagger: 0.1, duration: 0.8 },
          "-=0.8"
        );

      // 3. Parallax Scroll Effect
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FAFAFA] text-gray-900 overflow-hidden flex flex-col md:flex-row"
    >
      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Left Content Section */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-16 lg:px-24 pb-12 pt-4 md:py-0">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#C5A059]" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Premium Real Estate
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-gray-900 mb-8"
        >
          The Art <br />
          <span className="font-light italic text-gray-400">of Living</span>
        </h1>

        <div ref={contentRef} className="max-w-md">
          <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">
            Discover a curated collection of architectural masterpieces.
            Where timeless design meets modern luxury in the most exclusive locations.
          </p>
        </div>

        <div ref={statsRef} className="flex gap-12 border-t border-gray-200 pt-8">
          <div>
            <span className="block text-4xl font-serif text-gray-900">140+</span>
            <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">Properties</span>
          </div>
          <div>
            <span className="block text-4xl font-serif text-gray-900">12</span>
            <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">Cities</span>
          </div>
        </div>
      </div>

      {/* Right Image Section - Sharp Edges, Full Height on Desktop */}
      <div className="relative h-[60vh] md:h-auto md:w-[45%] lg:w-[50%] overflow-hidden">
        <div ref={imageWrapperRef} className="absolute inset-0 h-full w-full">
          <Image
            ref={imageRef as React.RefObject<HTMLImageElement>}
            src="/2.avif"
            alt="Premium Architecture"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/10" /> {/* Subtle Overlay */}
        </div>

        {/* Decorative Badge */}
        <div className="absolute bottom-10 left-10 z-20 hidden md:flex items-center gap-4 bg-white/90 backdrop-blur p-4 pr-6 border-l-4 border-[#C5A059]">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-900">New Addition</span>
            <span className="text-sm font-serif italic text-gray-600">Modern Villa Series</span>
          </div>
        </div>
      </div>
    </div>
  );
}
