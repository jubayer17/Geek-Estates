"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AllPropertyCard from "./AllPropertyCard";
import propertiesData from "../../public/data/properties.json";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AllProjectShowGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    cardsRef.current = cardsRef.current.filter((el) => el && el.isConnected);

    const ctx = gsap.context(() => {
      // 1. Header Animation (Elegant Fade Up)
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom-=100",
          },
        }
      );

      // 2. Card Animation: Premium 3D Stagger
      // Cards slide up with a slight rotation and scale effect
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 120,
            opacity: 0,
            scale: 0.9,
            rotationX: 10, // Slight tilt backwards
            transformOrigin: "center top",
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power4.out", // Smoother, more luxurious ease
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=20", // Trigger slightly earlier
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
            delay: (i % 3) * 0.15, // Stagger logic
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto min-h-screen w-full overflow-hidden bg-[#FAFAFA] px-6 pb-32 pt-24 md:px-12"
    >
      {/* 
        Premium Background Texture 
        - Subtle grain overlay for texture
        - Very soft gradient mesh for depth
      */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-gray-100/50 to-gray-50/80" />

      {/* Premium Header Section */}
      <div ref={headerRef} className="relative z-10 mx-auto mb-20 max-w-4xl text-center">
        <span className="mb-4 inline-block font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">
          Exclusive Collection
        </span>
        <h2 className="mb-6 font-serif text-5xl font-medium leading-tight text-gray-900 md:text-6xl lg:text-7xl">
          Curated Properties <br />
          <span className="text-gray-400">For The Discerning</span>
        </h2>
        <div className="mx-auto h-px w-24 bg-gray-300" />
        <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-gray-500">
          Discover a portfolio of architecturally significant homes,
          where timeless design meets modern luxury in the heart of the city.
        </p>
      </div>

      {/* 
        Grid Layout: 
        - 3 Columns (md+)
        - Staggered Vertical Alignment (Column 2 shifted)
        - 3D Perspective Container
      */}
      <div
        className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-12"
        style={{ perspective: "1000px" }}
      >
        {/* Column 1 */}
        <div className="flex flex-col gap-12 pt-0">
          {propertiesData
            .filter((_, i) => i % 3 === 0)
            .map((property) => (
              <div key={property.id} ref={addToRefs} className="will-change-transform">
                <AllPropertyCard
                  image={property.image}
                  title={property.title}
                  address={property.address}
                  date="2024"
                  area={property.area}
                  price={property.price}
                />
              </div>
            ))}
        </div>

        {/* Column 2 - Shifted Down */}
        <div className="flex flex-col gap-12 md:pt-24">
          {propertiesData
            .filter((_, i) => i % 3 === 1)
            .map((property) => (
              <div key={property.id} ref={addToRefs} className="will-change-transform">
                <AllPropertyCard
                  image={property.image}
                  title={property.title}
                  address={property.address}
                  date="2024"
                  area={property.area}
                  price={property.price}
                />
              </div>
            ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-12 pt-0 md:pt-12 lg:pt-0">
          {propertiesData
            .filter((_, i) => i % 3 === 2)
            .map((property) => (
              <div key={property.id} ref={addToRefs} className="will-change-transform">
                <AllPropertyCard
                  image={property.image}
                  title={property.title}
                  address={property.address}
                  date="2024"
                  area={property.area}
                  price={property.price}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
