'use client';

import React, { useState, useEffect } from 'react';
import Jobs from '@/components/career/Jobs';
import ContactAndCareerBanner from '@/components/reuseable/ContactBanner';
import CareerValues from '@/components/career/CareerValues';
import CareerPerks from '@/components/career/CareerPerks';

export default function Career() {
  const [heroData, setHeroData] = useState({
    title: 'Join Our Team',
    subtitle: 'We’re always looking for talented people. Explore opportunities and grow your career with us!',
    image: '/career.jpg'
  });

  useEffect(() => {
    fetch('http://localhost:5000/career/page')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setHeroData({
            title: data.heroTitle || 'Join Our Team',
            subtitle: data.heroSubtitle || 'We’re always looking for talented people. Explore opportunities and grow your career with us!',
            image: data.heroImage || '/career.jpg'
          });
        }
      })
      .catch(err => console.error('Failed to fetch career page data:', err));
  }, []);

  return (
    <div className="bg-white">
      <ContactAndCareerBanner
        imageSrc={heroData.image}
        title={heroData.title}
        subtitle={heroData.subtitle}
      />

      <CareerValues />
      <CareerPerks />
      <Jobs />
    </div>
  )
}
