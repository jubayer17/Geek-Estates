"use client"
import Companies from "@/components/home/Companies";
import CraftedSpaces from "@/components/home/CraftedSpaces";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import FindProperties from "@/components/home/FindProperties";
import HeroSection from "@/components/home/HeroSection";
import Banner from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularRealEstate from "@/components/home/PopularRealEstate";
import TestimonialsSection from "@/components/home/Reviews";

import TopNotchedProperties from "@/components/home/TopProperties";
import LocationSection from "@/components/home/LocationSection";

import WhyWithUs from "@/components/home/WhyWithUs";
import LetsConnect from "@/components/home/LetsConnect";
import StatsSection from "@/components/home/StatsSection";
export default function Home() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroSection />

      <WhyWithUs />
      <StatsSection />
      {/* <Companies /> */}
      <CraftedSpaces />
      <TopNotchedProperties />
      {/* <FeaturedProperties /> */}
      <FindProperties />
      <HowItWorks />
      <TestimonialsSection />
      {/* <Testimonials /> */}
      {/* <PopularRealEstate /> */}
      <LocationSection />
    </div>
  );
}
