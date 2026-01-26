import AboutSection from '@/components/AboutUs/AboutSection'
import LeadersSection from '@/components/AboutUs/LeadersSection'
import ContactBanner from '@/components/reuseable/ContactBanner'
import StatsSection from '@/components/AboutUs/StatsSection'
import ValuesSection from '@/components/AboutUs/ValuesSection'
import AwardsSection from '@/components/AboutUs/AwardsSection'
import OurJourneySection from '@/components/AboutUs/OurJourneySection'
import PartnersSection from '@/components/AboutUs/PartnersSection'
import ClientTestimonials from '@/components/AboutUs/ClientTestimonials'
import AboutCTA from '@/components/AboutUs/AboutCTA'


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
