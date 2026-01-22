"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ContactBannerProps = {
  imageSrc: string;
  title?: string;
  subtitle?: string;
};

export default function ContactAndCareerBanner({
  imageSrc,
  title = "Contact Us",
  subtitle = "We'd love to hear from you. Reach out to us anytime!",
}: ContactBannerProps) {
  return (
    <section className="relative w-full h-[500px] md:h-[600px]">
      {/* Banner Image */}
      <Image
        src={imageSrc}
        alt="Contact Banner"
        fill
        className="object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20 z-20">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
