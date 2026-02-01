import BlogList from '@/components/news-and-blogs/Bloglist'
import ContactBanner from '@/components/reuseable/ContactBanner'
import Newsletter from '@/components/news-and-blogs/Newsletter'
import MarketIntelligence from '@/components/news-and-blogs/MarketIntelligence'
import React from 'react'

export default function Blog() {
  return (
    <div>
      <ContactBanner
        title="Insights & News"
        subtitle="Stay updated with the latest trends, market analysis, and expert advice in the world of luxury real estate."
      />
      <BlogList />
      <Newsletter />
      <MarketIntelligence />
    </div>
  )
}
