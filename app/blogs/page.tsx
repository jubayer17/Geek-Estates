import BlogList from '@/components/News & Blogs/Bloglist'
import ContactBanner from '@/components/reuseable/ContactBanner'
import Newsletter from '@/components/News & Blogs/Newsletter'
import MarketIntelligence from '@/components/News & Blogs/MarketIntelligence'
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
