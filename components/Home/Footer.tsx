"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight, Send, Home } from "lucide-react";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for grid items
      gsap.from(".footer-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });

      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-slate-950 pt-20 pb-0 overflow-hidden relative border-t border-white/10">

      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#E7C873]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Top Section: Navigation & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 lg:gap-x-24 mb-24">

          {/* 1. Brand & CTA */}
          <div className="footer-item md:col-span-4 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#E7C873] rounded-lg flex items-center justify-center">
                  <Home className="text-slate-900 w-6 h-6" />
                </div>
                <span className="text-2xl font-serif text-white tracking-tight">Geek<span className="text-[#E7C873]">Estate</span></span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
                Elevating the art of <br />
                <span className="font-serif italic text-[#E7C873]">living well.</span>
              </h3>
              <Link href="/contact" className="inline-flex items-center gap-3 text-white group">
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#E7C873] group-hover:border-[#E7C873] group-hover:text-slate-900 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
                <span className="text-lg font-light tracking-wide">Start Your Journey</span>
              </Link>
            </div>
          </div>

          {/* 2. Links Columns */}
          <div className="footer-item md:col-span-4 lg:col-span-4 grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <h4 className="text-[#E7C873] text-xs uppercase tracking-[0.2em] mb-6 md:mb-8 font-medium">Explore</h4>
              <ul className="space-y-4">
                {["Properties", "Neighborhoods", "Agents", "Journal"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm md:text-base font-light block py-1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E7C873] text-xs uppercase tracking-[0.2em] mb-6 md:mb-8 font-medium">Company</h4>
              <ul className="space-y-4">
                {["About Us", "Careers", "Contact", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm md:text-base font-light block py-1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Newsletter */}
          <div className="footer-item md:col-span-4 lg:col-span-3">
            <h4 className="text-[#E7C873] text-xs uppercase tracking-[0.2em] mb-6 md:mb-8 font-medium">Newsletter</h4>
            <p className="text-slate-400 text-sm font-light mb-6 leading-relaxed">
              Join our exclusive circle for off-market listings and market insights.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E7C873] transition-colors"
              />
              <button className="w-full bg-[#E7C873] text-slate-900 py-3 font-medium hover:bg-white transition-colors uppercase tracking-widest text-xs">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-8 md:mb-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-light uppercase tracking-wider mb-12 md:mb-24">
          <p>© {currentYear} GeekRealEstate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#E7C873] transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-[#E7C873] transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-[#E7C873] transition-colors">Twitter</Link>
          </div>
        </div>

        {/* MASSIVE BRANDING - Full Width */}
        <div className="relative w-full overflow-hidden leading-none select-none mb-1 pointer-events-none">
          <h1 ref={titleRef} className="text-[15.5vw] font-bold text-center tracking-tighter whitespace-nowrap leading-[0.75]">
            <span className="text-white">GEEK</span>
            <span className="text-[#E7C873]">ESTATE</span>
          </h1>
        </div>

      </div>
    </footer>
  );
}
