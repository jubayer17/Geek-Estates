"use client"
import CraftedSpaces from "@/components/Home/CraftedSpaces";
import FindProperties from "@/components/Home/FindProperties";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import TestimonialsSection from "@/components/Home/Reviews";

import TopNotchedProperties from "@/components/Home/TopProperties";
import LocationSection from "@/components/Home/LocationSection";

import WhyWithUs from "@/components/Home/WhyWithUs";
import StatsSection from "@/components/Home/StatsSection";
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
