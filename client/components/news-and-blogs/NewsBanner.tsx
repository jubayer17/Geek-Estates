"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import config from "@/app/config";

interface ImageData {
  id: string;
  url: string;
  altText: string;
  isActive: boolean;
}

interface PageContent {
  id: string;
  page: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}

export default function NewsBanner() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch page content and images on mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Adjust URLs to your real API endpoints
        const [pageRes, imagesRes] = await Promise.all([
          fetch(`${config.base_url}/news-and-blogs-text`),
          fetch(`${config.base_url}/about-us-banner-image`),
        ]);

        if (!pageRes.ok || !imagesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const pageData: PageContent = await pageRes.json();
        const imagesData: ImageData[] = await imagesRes.json();

        // Filter active images if needed
        const activeImages = imagesData.filter((img) => img.isActive);

        setPageContent(pageData);
        setImages(activeImages);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error loading data");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Image slideshow timer
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">Loading content...</div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="relative w-full min-h-auto lg:min-h-[85vh] flex flex-col-reverse lg:flex-row bg-white overflow-hidden">
      {/* Left Content Section */}
      <div className="w-full lg:w-[45%] relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-0">
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
              {pageContent?.page || "Contact Us"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.1]">
            {pageContent?.title || (
              <>
                Let&apos;s Build <br />
                <span className="italic text-[#423b28]">Something Great</span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md font-light">
            {pageContent?.subtitle ||
              "We are here to help you find your dream property. Experience luxury, comfort, and elegance with our premium real estate solutions."}
          </p>

          {/* Contact Details Mini-Grid */}
          {pageContent?.page !== "Career" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:border-[#E7C873]/50 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-[#E7C873]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Call Us
                  </p>
                  <p className="text-[#1A1A1A] font-medium mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:border-[#E7C873]/50 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[#E7C873]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Email Us
                  </p>
                  <p className="text-[#1A1A1A] font-medium mt-1">
                    hello@geekrealestate.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-[55%] relative h-[50vh] lg:h-auto overflow-hidden">
        {/* Vertical Golden Line Separator */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[#E7C873]/20 z-30 hidden lg:block" />

        {/* Image Slideshow */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={images[currentIndex]?.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.altText || pageContent?.title || "Image"}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
