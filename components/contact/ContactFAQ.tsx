"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { faqs } from "@/lib/data/contactData";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#F2F2F2] py-24 md:py-40 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-450 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left Column - Sticky Heading */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-[1px] bg-[#1A1A1A]"></span>
                  <span className="text-[#1A1A1A] font-mono text-sm tracking-[0.3em] uppercase">The Details</span>
                </div>

                <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#1A1A1A] leading-[0.9] mb-12">
                  <span className="block text-transparent" style={{ WebkitTextStroke: "1px #1A1A1A" }}>Common</span>
                  <span className="block italic text-[#1A1A1A]">Queries</span>
                  <span className="block text-[#E7C873]">& Answers</span>
                </h2>

                <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md mb-12">
                  Your questions, answered with the same precision and care we apply to our properties.
                </p>

                <motion.button
                  whileHover={{ x: 10 }}
                  className="hidden lg:flex items-center gap-3 text-[#1A1A1A] uppercase tracking-widest text-sm font-bold group"
                >
                  <span className="border-b border-[#1A1A1A] pb-1">Contact Support</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="border-b border-gray-300 group"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-start py-10 md:py-12 text-left transition-all duration-500 relative overflow-hidden"
                    >
                      {/* Hover Background */}
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        style={{ originX: 0 }}
                      />

                      <div className="relative z-10 flex w-full items-start gap-6 md:gap-10 px-4 md:px-6">
                        <span className={`font-mono text-sm md:text-base tracking-widest transition-colors duration-300 mt-2 ${isOpen ? "text-[#E7C873]" : "text-gray-400 group-hover:text-[#1A1A1A]"}`}>
                          {(index + 1).toString().padStart(2, '0')}
                        </span>

                        <div className="flex-1">
                          <h3 className={`text-2xl md:text-4xl font-serif transition-colors duration-300 ${isOpen ? "text-[#1A1A1A]" : "text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]"}`}>
                            {faq.question}
                          </h3>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 md:pt-8 pr-0 md:pr-12">
                                  <p className="text-gray-500 text-lg leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className={`relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-[#1A1A1A]/20 transition-all duration-500 mt-1 flex-shrink-0 ${isOpen ? "bg-[#1A1A1A] border-[#1A1A1A]" : "group-hover:border-[#E7C873] group-hover:bg-[#E7C873]"}`}>
                          <Plus className={`absolute w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "text-[#1A1A1A] group-hover:text-white"}`} />
                          <Minus className={`absolute w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${isOpen ? "opacity-100 text-[#E7C873]" : "opacity-0 -rotate-90"}`} />
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
