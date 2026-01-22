"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function InteractiveContentGrid({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 mt-16">

      {/* TEXT AREA – 65% (CENTERED) */}
      <div className="lg:col-span-6 flex items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-6">
              {active.title}
            </h3>

            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* IMAGE GRID – 35% (SMALLER & STYLISH) */}
      <div className="lg:col-span-4 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setActive(item)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className={`w-[120px] h-[160px] md:w-[140px] md:h-[190px]
                cursor-pointer overflow-hidden rounded-2xl
                transition-all duration-300
                ${
                  active.id === item.id
                    ? "ring-2 ring-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.35)]"
                    : "opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
