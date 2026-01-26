"use client";

import { useEffect, useRef } from "react";
import careersData from "../../public/data/career.json";
import { format, isAfter } from "date-fns";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Briefcase, Clock, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Career = {
  id: number;
  title: string;
  description: string;
  salary: string;
  experience: string;
  location: string;
  deadline: string;
};

export default function CareersSection() {
  const today = new Date();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".jobs-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Grid Animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-24 jobs-header relative">
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#E7C873] mb-6"></div>
            <div className="inline-block border border-[#E7C873] px-6 py-2 rounded-full mb-8">
              <span className="text-[#1A1A1A] uppercase tracking-[0.2em] text-xs font-bold">
                Join The Team
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#1A1A1A] mb-8 leading-none">
              Current <br />
              <span className="italic font-light text-gray-400">Positions</span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-xl mx-auto mb-12">
              Discover the role that will challenge you, inspire you, and let you make a real impact.
            </p>
            <div className="w-24 h-1 bg-[#1A1A1A] mx-auto"></div>
          </div>

          {/* Architectural Grid Lines Background */}
          <div className="absolute inset-0 flex justify-center pointer-events-none opacity-5">
            <div className="w-px h-full bg-black mx-24"></div>
            <div className="w-px h-full bg-black mx-24 hidden md:block"></div>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careersData.map((job: Career) => {
            const deadlineDate = new Date(job.deadline);
            const isActive = isAfter(deadlineDate, today);

            return (
              <Link
                key={job.id}
                href={isActive ? `/career/${job.id}` : "#"}
                className={`group relative bg-white rounded-none border border-gray-100 p-8 transition-all duration-500 block ${isActive
                    ? "cursor-pointer hover:bg-[#1F4B43] hover:shadow-2xl hover:-translate-y-2"
                    : "opacity-60 grayscale cursor-not-allowed pointer-events-none"
                  }`}
              >
                {/* Background Watermark (Optional) */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <Briefcase className="w-32 h-32 text-[#E7C873] -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-[#E7C873] transition-colors duration-500">
                      <Briefcase className="w-6 h-6 text-[#1A1A1A] group-hover:text-[#1F4B43] transition-colors duration-500" />
                    </div>
                    {isActive ? (
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1F4B43] bg-[#1F4B43]/10 group-hover:bg-white/10 group-hover:text-white rounded-full transition-colors duration-500">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-100 rounded-full">
                        Closed
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-white transition-colors duration-500">
                    {job.title}
                  </h3>

                  <p className="text-gray-600 mb-8 line-clamp-3 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                    {job.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-500">
                      <DollarSign className="w-4 h-4 mr-3 text-[#E7C873]" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-500">
                      <MapPin className="w-4 h-4 mr-3 text-[#E7C873]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-500">
                      <Clock className="w-4 h-4 mr-3 text-[#E7C873]" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-500">
                      <Calendar className="w-4 h-4 mr-3 text-[#E7C873]" />
                      <span>Apply by {format(deadlineDate, "MMM dd, yyyy")}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-[#1A1A1A] font-medium group-hover:text-[#E7C873] transition-colors duration-500">
                    <span className="uppercase tracking-widest text-sm mr-2">View Details</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
