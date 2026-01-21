"use client"
import Companies from "@/components/Home/Companies";
import CraftedSpaces from "@/components/Home/CraftedSpaces";
import FeaturedProperties from "@/components/Home/FeaturedProperties";
import FindProperties from "@/components/Home/FindProperties";
import HeroSection from "@/components/Home/HeroSection";
import Banner from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularRealEstate from "@/components/Home/PopularRealEstate";
import TestimonialsSection from "@/components/Home/Reviews";

import TopNotchedProperties from "@/components/Home/TopProperties";
import LocationSection from "@/components/Home/LocationSection";

import WhyWithUs from "@/components/Home/WhyWithUs";
import LetsConnect from "@/components/Home/LetsConnect";
import StatsSection from "@/components/Home/StatsSection";
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
      <LetsConnect />
    </div>
  );
}
