import ContactBanner from '@/components/Contact/ContactBanner'
import ContactForm from '@/components/Contact/ContactForm'
import React from 'react'

export default function Contact() {
  return (
    <div>
        <ContactBanner imageSrc='/9.avif'/>
        <ContactForm/>
    </div>
  )
}
