"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CTAData {
  ctaBadge?: string;
  ctaTitleRegular?: string;
  ctaTitleItalic?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

interface AllProjectsCTAProps {
  data?: CTAData;
}

export default function AllProjectsCTA({ data }: AllProjectsCTAProps) {
  const badge = data?.ctaBadge || "Bespoke Service";
  const titleRegular = data?.ctaTitleRegular || "Can't find exactly what";
  const titleItalic = data?.ctaTitleItalic || "you're looking for?";
  const description = data?.ctaDescription || "Our private collection includes exclusive off-market listings reserved for our most discerning clients. Let us help you find your perfect match.";
  const buttonText = data?.ctaButtonText || "Contact Our Team";

  return (
    <section className="relative py-24 md:py-32 bg-[#1A1A1A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="#E7C873" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-[#E7C873] font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-6">
              {badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              {titleRegular} <br className="hidden md:block" />
              <span className="italic text-[#E7C873]">{titleItalic}</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-[#E7C873]/30 hover:border-[#E7C873] text-white transition-all duration-500 relative overflow-hidden"
              >
                {/* Fill Animation */}
                <div className="absolute inset-0 bg-[#E7C873] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out will-change-transform" />

                <span className="relative z-10 font-mono text-sm tracking-[0.1em] uppercase group-hover:text-[#1A1A1A] transition-colors duration-500">
                  {buttonText}
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 text-[#E7C873] group-hover:text-[#1A1A1A] transition-colors duration-500" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
