'use client';

import { useSearchParams } from 'next/navigation';
import HomeBanner from './HomeBanner';
import AddHeroBanner from './AddHomeBanner';
import HomeTextPage from './HomeText';
import HomeFeaturedImagePage from './HomeFeatuedImage';
import HomeExperienceTextPage from './HomeExperienceTextPage';
import AddExperienceText from './AddNewExperienceText';
import PropertySearchCard from './PropertySerach';
import AddPropertySearch from './addPropertySerach';
import ContactPage from './ContactInfoPage';
import ContactInfoPage from './ContactInfoPage';


export default function AdminCareerPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E7C873]">
          {view === 'hero' }
        </h1>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {view === 'hero' && <HomeBanner/>}
        {view === 'addBanner' && <AddHeroBanner/>}
        {view === 'homeText' && <HomeTextPage/>}
        {view === 'homeFeatureImage' && <HomeFeaturedImagePage/>}
        {view === 'homeCompanyExperience' && <HomeExperienceTextPage/>}
        {view === 'addHomeCompanyExperience' && <AddExperienceText/>}
        {view === 'propertySearch' && <PropertySearchCard/>}
        {view === 'addPropertySearch' && <AddPropertySearch/>}
        {view === "contactInfo" && <ContactInfoPage />}

       
      </div>
    </div>
  );
}
