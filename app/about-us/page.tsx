import AboutSection from '@/components/about-us/AboutSection'
import LeadersSection from '@/components/about-us/LeadersSection'
import ContactBanner from '@/components/reuseable/ContactBanner'
import StatsSection from '@/components/about-us/StatsSection'
import ValuesSection from '@/components/about-us/ValuesSection'
import AwardsSection from '@/components/about-us/AwardsSection'
import OurJourneySection from '@/components/about-us/OurJourneySection'
import PartnersSection from '@/components/about-us/PartnersSection'
import ClientTestimonials from '@/components/about-us/ClientTestimonials'
import AboutCTA from '@/components/about-us/AboutCTA'


export default function AboutUs() {
  return (
    <div>
      <ContactBanner
        title="About Us"
        subtitle="Redefining luxury living with a legacy of excellence, integrity, and innovation."
      />
      <AboutSection />
      <StatsSection />
      <PartnersSection />
      <ValuesSection />
      <AwardsSection />
      <OurJourneySection />
      <LeadersSection />
      <ClientTestimonials />
      <AboutCTA />
    </div>
  )
}
