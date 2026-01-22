import AboutSection from '@/components/AboutUs/AboutSection'
import LeadersSection from '@/components/AboutUs/LeadersSection'
import OurJourneySection from '@/components/AboutUs/OurJourneySection'


export default function AboutUs() {
  return (
    <div>
        <AboutSection/>
        <OurJourneySection/>
        <LeadersSection/>
        {/* TODO
        Can add our partners */}
    </div>
  )
}
