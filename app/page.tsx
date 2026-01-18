import FeaturedProperties from "@/components/Home/FeaturedProperties";
import FindProperties from "@/components/Home/FindProperties";
import HeroSection from "@/components/Home/HeroSection";
import Banner from "@/components/Home/HeroSection";
import MeetTeam from "@/components/Home/MeetTeam";
import PopularRealEstate from "@/components/Home/PopularRealEstate";

import WhyWithUs from "@/components/Home/WhyWithUs";


export default function Home() {
  return (
    <div>
        <HeroSection/>
        <WhyWithUs/>
        <FeaturedProperties/>
        <FindProperties/>
        <PopularRealEstate/>
        <MeetTeam/>
    </div>
  );
}
