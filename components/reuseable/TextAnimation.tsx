"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number;
  label: string;
  suffix?: string;
};

type OurStoryProps = {
  title: string;
  paragraphs: string[];
  image: string;
  stats: Stat[];
  bgColor?: string;
};

export default function OurStoryTextAnimation({
  title,
  paragraphs,
  image,
  stats,
  bgColor = "#FFFFFF",
}: OurStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    /* Paragraph animation (staggered) */
    gsap.from(".story-paragraph", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "restart pause reverse pause", // <--- key change
      },
    });

    /* Counter animation */
    numbersRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: stats[i].value,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "restart pause reverse pause", // <--- key change
          },
        }
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, [stats]);


  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="w-full text-white py-20"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
        
{/* CONTENT (70%) */}
        <div className="lg:col-span-7">
          <h2 className="text-4xl font-bold mb-6 uppercase">
            {title}
          </h2>

          {paragraphs.map((text, index) => (
            <p
              key={index}
              className="story-paragraph text-lg text-white/90 mb-4"
            >
              {text}
            </p>
          ))}

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {stats.map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl font-bold">
                  <span
                    ref={(el) => {
                      if (el) numbersRef.current[i] = el;
                    }}
                  />
                  {stat.suffix}
                </h3>
                <p className="text-sm uppercase tracking-wide story-paragraph text-white/80 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE (30%) */}
        <div className="lg:col-span-3 story-paragraph">
          <Image
            src={image}
            alt={title}
            width={600}
            height={800}
            className="rounded-xl object-cover"
          />
        </div>

        
      </div>
    </section>
  );
}
