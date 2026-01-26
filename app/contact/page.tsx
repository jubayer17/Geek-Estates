import ContactForm from '@/components/Contact/ContactForm'
import ContactFAQ from '@/components/Contact/ContactFAQ'
import ContactBanner from '@/components/reuseable/ContactBanner'
import React from 'react'

export default function Contact() {
  return (
    <div>
      <ContactBanner />
      <ContactForm />
      <ContactFAQ />
    </div>
  )
}
