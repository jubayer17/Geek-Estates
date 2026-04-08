import BlogList from '@/components/news-and-blogs/Bloglist'
import ContactBanner from '@/components/reuseable/ContactBanner'
import Newsletter from '@/components/news-and-blogs/Newsletter'
import MarketIntelligence from '@/components/news-and-blogs/MarketIntelligence'
import React from 'react'
import NewsBanner from '@/components/news-and-blogs/NewsBanner'

export default function Blog() {
  return (
    <div>
      <NewsBanner/>
      <BlogList />
      <Newsletter />
      <MarketIntelligence />
    </div>
  )
}
