'use client';

import { useSearchParams } from 'next/navigation';
import CareerHeroForm from './CareerHeroForm';
import CareerValuesForm from './CareerValuesForm';
import CareerPerksForm from './CareerPerksForm';
import CareerJobsContentForm from './CareerJobsContentForm';
import CareerJobsList from './CareerJobsList';

export default function AdminCareerPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E7C873]">
          {view === 'hero' && 'Hero Section Configuration'}
          {view === 'values' && 'Values Section Configuration'}
          {view === 'perks' && 'Perks Section Configuration'}
          {view === 'jobs-content' && 'Jobs Content Configuration'}
          {!view && 'Career Opportunities'}
        </h1>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {view === 'hero' && <CareerHeroForm />}
        {view === 'values' && <CareerValuesForm />}
        {view === 'perks' && <CareerPerksForm />}
        {view === 'jobs-content' && <CareerJobsContentForm />}
        {!view && <CareerJobsList />}
      </div>
    </div>
  );
}
