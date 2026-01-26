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
    <section className="bg-white py-32 px-6 md:px-20 overflow-hidden">
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold mb-4 block">
          Leadership
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">
          Meet The Visionaries
        </h2>
      </motion.div>

      {/* LEADERS LIST */}
      <div className="space-y-32 max-w-6xl mx-auto">
        {data.map((leader, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`flex flex-col gap-12 items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
          >
            {/* IMAGE */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px]">
                {/* Sharp offset border */}
                <div className="absolute inset-0 border-[1px] border-[#E7C873] translate-x-4 translate-y-4" />
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  quality={100}
                  priority={index < 2}
                  className="object-cover shadow-2xl relative z-10"
                />
              </div>
            </motion.div>

            {/* MESSAGE */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="mb-6">
                <span className="text-6xl font-serif text-[#E7C873]/20">&quot;</span>
                <p className="text-gray-500 italic leading-loose text-lg -mt-8 px-4 md:px-0">
                  {leader.message}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6 inline-block md:block w-full">
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">
                  {leader.name}
                </h3>
                <p className="text-[#E7C873] text-sm font-bold uppercase tracking-wider">
                  {leader.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
