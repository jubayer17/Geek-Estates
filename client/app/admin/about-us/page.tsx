"use client";

import { useSearchParams } from 'next/navigation';
import AboutUsTextPage from './AboutUsTextPage';
import AboutUsBannersPage from './AboutUsBannerPage';
import WhoWeArePage from './WhoAreWePage';
import AchievementPage from './AchivementPage';
import CoreValuesPage from './CoreValues';
import AboutUsAwardTextPage from './AboutUsAwardTextPage';
import AwardsPageWrapper from './AwardsRecordPage';
import JourneyTextSectionPage from './JourneyTextSection';
import AboutUsTimelinePage from './Timeline';
import LeadershipQuotesPage from './LeadershipPage';
import TestimonialsPage from './Testimonial';
import BuildPage from './BuildSection';




export default function AboutUs() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E7C873]">
          {view === 'hero' ? 'Hero Section' : ''}
        </h1>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {view === 'about-us-text' && <AboutUsTextPage/>}
        {view === 'about-us-banner' && <AboutUsBannersPage/>}
        {view === 'aboutWhoWeAre' && <WhoWeArePage/>}
        {view === 'aboutUsAchievements' && <AchievementPage/>}
      </div>
        {view === 'aboutUsAwardTextSection' && <AboutUsAwardTextPage/>}
        {view === 'aboutUsAwardRecords' && <AwardsPageWrapper/>}
        {view === 'aboutUsJourneyTextSection' && <JourneyTextSectionPage/>}
        {view === 'aboutUsJourneyTimeline' && <AboutUsTimelinePage/>}
        {view === 'aboutUsLeadership' && <LeadershipQuotesPage/>}
        {view === 'aboutUsTestimonial' && <TestimonialsPage/>}
        {view === 'aboutUsBuildSection' && <BuildPage/>}
    </div>
  );
}
