import React from 'react'
import Jobs from '@/components/career/Jobs'
import ContactAndCareerBanner from '@/components/reuseable/ContactBanner'
import CareerValues from '@/components/career/CareerValues'
import CareerPerks from '@/components/career/CareerPerks'

export default function Career() {
  return (
    <div className="bg-white">
        <ContactAndCareerBanner 
          imageSrc='/career.jpg' 
          title='Join Our Team' 
          subtitle='We’re always looking for talented people. Explore opportunities and grow your career with us!'
        />
        
        <CareerValues />
        <CareerPerks />
        <Jobs />
    </div>
  )
}
