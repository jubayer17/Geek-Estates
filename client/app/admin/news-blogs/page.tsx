"use client";

import { useSearchParams } from 'next/navigation';
import NewsPage from './NewsPage';
import StayConnectedPage from './StayConnectedPage';
import SubscribersPage from './SubscriberPage';
import ReportsPage from './ReportsPage';

export default function NewsAndBlogs() {
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
        {view === 'news' && <NewsPage/>}
        {view === 'stay-connected' && <StayConnectedPage/>}
        {view === 'subscribers' && <SubscribersPage/>}
        {view === 'reports' && <ReportsPage/>}
      </div>
    </div>
  );
}
