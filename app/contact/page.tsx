import ContactForm from '@/components/Contact/ContactForm'
import ContactAndCareerBanner from '@/components/reuseable/ContactBanner'

export default function Contact() {
  return (
    <div>
        <ContactAndCareerBanner imageSrc='/9.avif'/>
        <ContactForm/>
    </div>
  )
}
