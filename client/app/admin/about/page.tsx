'use client';

import { useSearchParams } from 'next/navigation';
import AboutGeneralForm from './AboutGeneralForm';
import AboutWhoWeAreForm from './AboutWhoWeAreForm';
import AboutAchievementsForm from './AboutAchievementsForm';
import AboutAwardsForm from './AboutAwardsForm';
import AboutJourneyForm from './AboutJourneyForm';
import AboutLeadershipForm from './AboutLeadershipForm';
import AboutTestimonialsForm from './AboutTestimonialsForm';

export default function AdminAboutPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'general';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E7C873]">
          {view === 'general' && 'General Information'}
          {view === 'who-we-are' && 'Who We Are'}
          {view === 'achievements' && 'Achievements & Core Values'}
          {view === 'awards' && 'Awards & Recognition'}
          {view === 'journey' && 'Our Journey'}
          {view === 'leadership' && 'Leadership Team'}
          {view === 'testimonials' && 'Testimonials'}
        </h1>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {view === 'general' && <AboutGeneralForm />}
        {view === 'who-we-are' && <AboutWhoWeAreForm />}
        {view === 'achievements' && <AboutAchievementsForm />}
        {view === 'awards' && <AboutAwardsForm />}
        {view === 'journey' && <AboutJourneyForm />}
        {view === 'leadership' && <AboutLeadershipForm />}
        {view === 'testimonials' && <AboutTestimonialsForm />}
      </div>
    </div>
  );
}
