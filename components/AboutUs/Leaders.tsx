"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Leader = {
  name: string;
  role: string;
  message: string;
  image: string;
};

export default function Leaders({ data }: { data: Leader[] }) {
  return (
    <section className="bg-black py-32 px-6 md:px-20">
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl text-white mb-24"
      >
        Leaders
      </motion.h2>

      {/* LEADERS LIST */}
      <div className="space-y-28">
        {data.map((leader, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: false }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* IMAGE (LEFT) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-end"
            >
              <Image
  src={leader.image}
  alt={leader.name}
  width={260}
  height={320}
  className="object-cover shadow-xl rounded-full"
/>

            </motion.div>

            {/* MESSAGE (RIGHT) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="text-white max-w-xl"
            >
              <p className="text-gray-300 italic leading-relaxed text-lg mb-6">
                “{leader.message}”
              </p>

              <h3 className="text-xl font-semibold">
                {leader.name}
              </h3>

              <span className="text-sm text-gray-400">
                {leader.role}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
