"use client";

import { useEffect, useRef, useState } from "react";
import { format, isAfter } from "date-fns";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Briefcase, Clock, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Career = {
  id: string;
  title: string;
  description: string;
  salary: string;
  experience: string;
  location: string;
  deadline: string;
};

type PageData = {
  badge: string;
  title: string;
  description: string;
};

export default function CareersSection() {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    badge: "Join The Team",
    title: "Current Positions",
    description: "Discover the role that will challenge you, inspire you, and let you make a real impact."
  });
  const today = new Date();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageRes, jobsRes] = await Promise.all([
          fetch('http://localhost:5000/career/page'),
          fetch('http://localhost:5000/career/jobs')
        ]);
        if (pageRes.ok) {
          const page = await pageRes.json();
          // Use defaults if empty strings (though backend should handle this)
          if (page) {
            setPageData({
              badge: page.jobsBadge || "Join The Team",
              title: page.jobsTitle || "Current Positions",
              description: page.jobsDescription || "Discover the role that will challenge you, inspire you, and let you make a real impact."
            });
          }
        }
        if (jobsRes.ok) setJobs(await jobsRes.json());
      } catch (e) {
        console.error("Failed to fetch career data", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

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
      if (cards && cards.length > 0) {
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
  }, [jobs, pageData]); // Re-run animation when data loads

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-24 jobs-header relative">
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#E7C873] mb-6"></div>
            <div className="inline-block border border-[#E7C873] px-6 py-2 rounded-full mb-8">
              <span className="text-[#1A1A1A] uppercase tracking-[0.2em] text-xs font-bold">
                {pageData.badge}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#1A1A1A] mb-8 leading-none">
              {pageData.title}
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-xl mx-auto mb-12">
              {pageData.description}
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
          {jobs.map((job) => {
            const deadlineDate = new Date(job.deadline);
            const isExpired = isAfter(today, deadlineDate);

            return (
              <div
                key={job.id}
                className="group relative bg-white p-8 border border-gray-200 hover:border-[#E7C873] transition-all duration-500 hover:shadow-2xl hover:shadow-[#E7C873]/10"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#E7C873]/0 group-hover:bg-[#E7C873]/5 transition-colors duration-500"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 group-hover:bg-white transition-colors duration-500">
                      <Briefcase className="w-6 h-6 text-[#1A1A1A]" />
                    </div>
                    {isExpired ? (
                      <span className="text-red-500 text-xs font-bold uppercase tracking-wider border border-red-200 px-3 py-1">
                        Closed
                      </span>
                    ) : (
                      <span className="text-[#E7C873] text-xs font-bold uppercase tracking-wider border border-[#E7C873] px-3 py-1">
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-[#E7C873] transition-colors duration-300">
                    {job.title}
                  </h3>

                  <p className="text-gray-500 mb-8 line-clamp-3 flex-grow font-light">
                    {job.description}
                  </p>

                  <div className="space-y-4 mb-8 border-t border-gray-100 pt-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <DollarSign className="w-4 h-4 mr-3 text-[#E7C873]" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-3 text-[#E7C873]" />
                      {job.experience}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-3 text-[#E7C873]" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-3 text-[#E7C873]" />
                      Deadline: {format(deadlineDate, "MMM dd, yyyy")}
                    </div>
                  </div>

                  <Link
                    href={`/career/${job.id}`}
                    className={`inline-flex items-center justify-between w-full py-4 px-6 border transition-all duration-300 ${isExpired
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-[#1A1A1A] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A]"
                      }`}
                    onClick={(e) => isExpired && e.preventDefault()}
                  >
                    <span className="uppercase tracking-widest text-xs font-bold">
                      {isExpired ? "Position Closed" : "View Details"}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
