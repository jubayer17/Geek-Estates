"use client"

import { motion } from "framer-motion"
import { Shield, Star, Lightbulb, Users } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Unwavering Integrity",
    description: "We operate with complete transparency and honesty, ensuring that your trust is never compromised."
  },
  {
    icon: Star,
    title: "Pursuit of Excellence",
    description: "We set the highest standards in every aspect of our work, from property curation to client service."
  },
  {
    icon: Lightbulb,
    title: "Visionary Innovation",
    description: "Embracing cutting-edge technology and design trends to stay ahead of the curve in the real estate market."
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description: "Your unique needs and aspirations are at the heart of every decision we make and every property we show."
  }
]

export default function ValuesSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold mb-4 block">
            Our Core Values
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            The Principles That <br /> <span className="text-[#E7C873] italic">Drive Us Forward</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm p-10 border border-white/10 hover:border-[#E7C873]/50 transition-colors group overflow-hidden"
            >
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E7C873]/20 to-transparent -translate-y-8 translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
              
              <div className="w-12 h-12 bg-[#E7C873]/10 flex items-center justify-center mb-8 group-hover:bg-[#E7C873] transition-colors duration-300">
                <value.icon className="w-6 h-6 text-[#E7C873] group-hover:text-[#1A1A1A] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif mb-4 group-hover:text-[#E7C873] transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
