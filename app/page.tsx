"use client"
import CraftedSpaces from "@/components/home/CraftedSpaces";
import FindProperties from "@/components/home/FindProperties";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/Reviews";

import TopNotchedProperties from "@/components/home/TopProperties";
import LocationSection from "@/components/home/LocationSection";

import WhyWithUs from "@/components/home/WhyWithUs";
import StatsSection from "@/components/home/StatsSection";
export default function Home() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroSection />
      <WhyWithUs />
      <StatsSection />
      <CraftedSpaces />
      <TopNotchedProperties />
      <FindProperties />
      <HowItWorks />
      <TestimonialsSection />
      <LocationSection />
    </div>
  );
}
