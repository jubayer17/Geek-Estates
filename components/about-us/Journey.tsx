"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type JourneyItem = {
  year: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
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
      className="relative bg-white py-16 md:py-32 px-4 md:px-20 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* TITLE */}
      <div className="text-left md:text-center mb-16 md:mb-32 relative z-10">
        <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold mb-4 block">
          Our History
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
          The Journey
        </h2>
        <p className="text-gray-500 max-w-2xl md:mx-auto font-light text-lg">
          From humble beginnings to an industry leader, trace the milestones that define our legacy.
        </p>
      </div>

      {/* CENTER SCROLL LINE */}
      <div className="absolute left-6 md:left-1/2 top-[200px] md:top-[300px] bottom-[50px] md:bottom-[100px] -translate-x-1/2 w-[1px] bg-gray-100">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-[#E7C873] origin-top shadow-[0_0_10px_#E7C873]"
        />
      </div>

      {/* TIMELINE */}
      <div className="relative space-y-12 md:space-y-32 z-10">
        {data.map((item, index) => {
          const isLeft = item.side === "left";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* DIAMOND ICON — LEFT ON MOBILE, CENTER ON DESKTOP */}
              <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-30">
                <motion.div
                  initial={{ scale: 0, rotate: 45 }}
                  whileInView={{ scale: 1, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 md:w-14 md:h-14 bg-[#1A1A1A] flex items-center justify-center text-sm md:text-xl
                             border border-[#E7C873] shadow-2xl text-[#E7C873]"
                >
                  <div className="-rotate-45"> {/* Counter-rotate icon */}
                    {item.icon}
                  </div>
                </motion.div>
              </div>

              {/* CONTENT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center">
                {/* LEFT CARD */}
                {isLeft ? (
                  <TimelineCard item={item} align="right" />
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* RIGHT CARD */}
                {!isLeft ? (
                  <TimelineCard item={item} align="left" />
                ) : (
                  <div className="hidden md:block" />
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
      className={`relative p-6 md:p-10 bg-white border border-gray-100 shadow-[0_0_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 group ml-14 md:ml-0
                  ${align === "right" ? "text-left md:text-right md:mr-16 md:pr-12" : "text-left md:ml-16 md:pl-12"}`}
    >
      {/* Decorative Corner Accent */}
      <div className={`absolute top-0 w-8 h-8 border-t border-[#E7C873] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-[#E7C873]/20
        ${align === "right" ? "right-0 border-r" : "left-0 border-l"}`}
      />

      <span className="inline-block px-4 py-1 border border-[#E7C873] text-[#E7C873] font-bold text-xs md:text-sm mb-4 md:mb-6 tracking-widest uppercase">
        {item.year}
      </span>
      <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-2 md:mb-4">{item.title}</h3>
      <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">{item.description}</p>

      {/* Connector Line (Desktop Only) */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-[1px] bg-[#E7C873]
          ${align === "right" ? "-right-16" : "-left-16"}
        `}
      />
    </div>
  );
}
