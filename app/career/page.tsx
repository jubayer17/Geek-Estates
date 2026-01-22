import Jobs from '@/components/Career.tsx/Jobs'
import ContactAndCareerBanner from '@/components/reuseable/ContactBanner'
import React from 'react'

export default function Career() {
  return (
    <div>
        <ContactAndCareerBanner imageSrc='/career.jpg' title='Join Our Team' subtitle='We’re always looking for talented people. Explore opportunities and grow your career with us!'/>
        
        <Jobs/>
    </div>
  )
}
