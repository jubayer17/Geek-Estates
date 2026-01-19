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

import WhyWithUs from "@/components/Home/WhyWithUs";


export default function Home() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroSection />

      <WhyWithUs />
      {/* <Companies /> */}
      <CraftedSpaces />
      <TopNotchedProperties />
      {/* <FeaturedProperties /> */}
      <FindProperties />
      <HowItWorks />
      <TestimonialsSection />
      {/* <Testimonials /> */}
      <PopularRealEstate />
    </div>
  );
}
