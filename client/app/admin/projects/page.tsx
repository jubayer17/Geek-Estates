'use client';

import { useSearchParams } from 'next/navigation';
import ProjectsList from './ProjectsList';
import ProjectsHeroForm from './ProjectsHeroForm';
import ProjectsCTAForm from './ProjectsCTAForm';

export default function AdminProjectsPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#E7C873]">
          {view === 'hero' && 'Hero Banner Configuration'}
          {view === 'cta' && 'CTA Section Configuration'}
          {!view && 'Projects Management'}
        </h1>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {!view && <ProjectsList />}
        {view === 'hero' && <ProjectsHeroForm />}
        {view === 'cta' && <ProjectsCTAForm />}
      </div>
    </div>
  );
}
