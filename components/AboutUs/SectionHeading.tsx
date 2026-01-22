"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title }: { title: string }) {
  const [first, second] = title.split(" ");

  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-light tracking-widest text-white"
    >
      {first} <span className="text-[#e7c873]">{second}</span>
    </motion.h2>
  );
}
