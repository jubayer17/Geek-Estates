import ContactForm from '@/components/contact/ContactForm'
import ContactFAQ from '@/components/contact/ContactFAQ'
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
