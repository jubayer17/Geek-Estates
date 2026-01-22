"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type JourneyItem = {
  year: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  side: string;
};

export default function Journey({ data }: { data: JourneyItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#4a4a4a] py-32 px-6 md:px-20 overflow-hidden"
    >
      {/* TITLE */}
      <h2 className="text-center text-4xl md:text-5xl text-white mb-32">
        Our Journey
      </h2>

      {/* CENTER SCROLL LINE */}
      <div className="absolute left-1/2 top-[260px] -translate-x-1/2 h-[70%] w-[2px] bg-white/20">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-[#e7c873] origin-top"
        />
      </div>

      {/* TIMELINE */}
      <div className="relative space-y-32">
        {data.map((item, index) => {
          const isLeft = item.side === "left";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* ICON — EXACT CENTER */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl
                             border-2 border-[#e7c873] shadow-lg"
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* CONTENT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT CARD */}
                {isLeft ? (
                  <TimelineCard item={item} align="right" />
                ) : (
                  <div />
                )}

                {/* RIGHT CARD */}
                {!isLeft ? (
                  <TimelineCard item={item} align="left" />
                ) : (
                  <div />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  align
}: {
  item: JourneyItem;
  align: "left" | "right";
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-8 shadow-xl max-w-xl
        ${align === "left" ? "mr-auto text-left" : "ml-auto text-right"}`}
    >
      <span className="text-sm font-semibold text-[#e7c873]">
        {item.year}
      </span>

      <h3 className="text-lg md:text-xl font-semibold mt-2 mb-3">
        {item.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {item.description}
      </p>

      <p className="mt-4 text-xs font-medium text-gray-400">
        {item.label}
      </p>
    </div>
  );
}
