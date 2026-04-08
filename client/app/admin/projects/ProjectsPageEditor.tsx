'use client';

import { useState } from 'react';
import { 
  CreditCard,
  MousePointerClick,
  LayoutTemplate
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ProjectsHeroForm from './ProjectsHeroForm';
import ProjectsCTAForm from './ProjectsCTAForm';

type EditorView = 'hero-banner' | 'cta-section';

export default function ProjectsPageEditor() {
  const [activeView, setActiveView] = useState<EditorView>('hero-banner');

  return (
    <div className="flex h-[calc(100vh-200px)] gap-6">
      {/* Internal Navigation Panel */}
      <div className="w-64 flex-shrink-0 bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden h-fit">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-zinc-400 font-medium text-sm flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4" />
            Page Sections
          </h2>
        </div>
        <div className="p-2 space-y-1">
          <button
            onClick={() => setActiveView('hero-banner')}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
              activeView === 'hero-banner'
                ? "bg-[#E7C873]/10 text-[#E7C873]"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800"
            )}
          >
            <CreditCard className="w-4 h-4" />
            Hero Banner
          </button>
          <button
            onClick={() => setActiveView('cta-section')}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
              activeView === 'cta-section'
                ? "bg-[#E7C873]/10 text-[#E7C873]"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800"
            )}
          >
            <MousePointerClick className="w-4 h-4" />
            CTA Section
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {activeView === 'hero-banner' && 'Hero Banner Configuration'}
            {activeView === 'cta-section' && 'CTA Section Configuration'}
          </h2>
          <p className="text-zinc-400 mt-1">
            {activeView === 'hero-banner' && 'Edit the main hero section of the projects page'}
            {activeView === 'cta-section' && 'Edit the call-to-action section at the bottom'}
          </p>
        </div>

        <div className="min-h-[400px]">
          {activeView === 'hero-banner' && <ProjectsHeroForm />}
          {activeView === 'cta-section' && <ProjectsCTAForm />}
        </div>
      </div>
    </div>
  );
}
