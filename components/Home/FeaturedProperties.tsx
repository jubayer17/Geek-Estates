import React from 'react'
import TitleSubtitle from '../reuseable/TitleSubtitle'
import FeaturedTabs from './FeaturedTabs'

export default function FeaturedProperties() {
  return (
    <section className='lg:mt-50 md:mt-30 mt-10'>
       <TitleSubtitle title='Featured Properties' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <FeaturedTabs/>
    </section>
  )
}
