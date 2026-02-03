"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AllPropertyCard from "./AllPropertyCard";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Project = {
  id: string;
  title: string;
  image: string;
  location: string;
  price?: string;
  beds?: number;
  baths?: number;
  area?: number;
  status?: string;
  featured: boolean;
};

export default function AllProjectShowGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:4001/projects');
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    // Reset refs for new data
    cardsRef.current = [];

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
      // Wait for DOM to update with new projects
      setTimeout(() => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
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
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

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
        <h2 className="font-serif text-4xl font-medium leading-tight text-gray-900 md:text-6xl">
          Discover Your <br />
          <span className="italic text-[#C5A059]">Perfect Sanctuary</span>
        </h2>
        <div className="mx-auto mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
      </div>

      {/* Premium Grid Layout */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((property, index) => (
          <div
            key={property.id}
            ref={addToRefs}
            className="will-change-transform" // Performance hint
          >
            <AllPropertyCard property={property} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
