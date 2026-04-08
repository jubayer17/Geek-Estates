"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectsPageData {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  statsCount1: string;
  statsLabel1: string;
  statsCount2: string;
  statsLabel2: string;
  heroImages: string[];
}

interface AllPropertiesBannerProps {
  data?: ProjectsPageData;
}

const defaultImages = [
  "/outdoor-real-state/1.webp",
  "/outdoor-real-state/2.webp",
  "/outdoor-real-state/3.webp",
  "/outdoor-real-state/4.webp",
  "/outdoor-real-state/5.webp",
];

export default function AllPropertiesBanner({ data }: AllPropertiesBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = data?.heroImages?.length ? data.heroImages : defaultImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left Content Section */}
      <div className="w-full lg:w-[45%] relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Decorative Label */}
          <div className="flex items-center space-x-4">
            <div className="h-[2px] w-12 bg-[#E7C873]" />
            <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold">
              {data?.heroBadge || "Exclusive Portfolio"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.1]">
            {data?.heroTitle ? (
              data.heroTitle
            ) : (
              <>
                Curated <br />
                <span className="italic text-[#E7C873]">Excellence</span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md font-light">
            {data?.heroDescription || "Explore a world of architectural marvels. From modern villas to timeless estates, find the home that reflects your legacy."}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div>
              <span className="block text-4xl font-serif text-[#1A1A1A]">{data?.statsCount1 || "140+"}</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">{data?.statsLabel1 || "Properties"}</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-[#1A1A1A]">{data?.statsCount2 || "12"}</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">{data?.statsLabel2 || "Cities"}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-[55%] relative h-[50vh] lg:h-auto overflow-hidden">
        {/* Vertical Golden Line Separator */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[#E7C873]/20 z-30 hidden lg:block" />

        {/* Image Slideshow */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt="Premium Architecture"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle White Gradient for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent lg:from-white/0" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-12 z-20 flex space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full shadow-sm ${idx === currentIndex ? "w-8 bg-[#E7C873]" : "w-2 bg-white hover:bg-[#E7C873]/50"
                }`}
            />
          ))}
        </div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-12 right-12 z-20 bg-white/90 backdrop-blur-md shadow-2xl p-6 border-l-4 border-[#E7C873]"
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Featured</span>
            <span className="text-sm font-serif italic text-gray-500">Outdoor Collection</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
