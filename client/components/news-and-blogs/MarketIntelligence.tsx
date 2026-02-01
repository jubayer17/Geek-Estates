"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, PieChart, TrendingUp, Download, LucideProps } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reports = [
    {
        title: "Global Luxury Market Report Q4 2025",
        category: "Market Analysis",
        date: "Jan 2026",
        description: "An in-depth look at the shifting landscapes of high-net-worth property investments across major global capitals.",
        icon: GlobeIcon,
        size: "2.4 MB"
    },
    {
        title: "The Future of Smart Homes 2026",
        category: "Technology",
        date: "Dec 2025",
        description: "Analyzing the impact of AI and IoT integration on property valuation and buyer preferences in the luxury sector.",
        icon: ChipIcon,
        size: "1.8 MB"
    },
    {
        title: "Sustainable Urban Living Index",
        category: "Sustainability",
        date: "Nov 2025",
        description: "Ranking the world's most eco-conscious cities and the rise of green architecture in modern developments.",
        icon: LeafIcon,
        size: "3.1 MB"
    }
]

// Custom Icons
function GlobeIcon(props: LucideProps) {
    return <TrendingUp {...props} />
}
function ChipIcon(props: LucideProps) {
    return <BarChart3 {...props} />
}
function LeafIcon(props: LucideProps) {
    return <PieChart {...props} />
}

export default function MarketIntelligence() {
    return (
        <section className="py-24 px-6 md:px-20 bg-[#F9F9F9] border-t border-gray-200">
            <div className="max-w-[1920px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#E7C873] uppercase tracking-[0.2em] text-xs font-bold mb-4 block flex items-center gap-3">
                            <span className="w-8 h-px bg-[#E7C873]"></span>
                            Data & Research
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
                            Market <span className="italic text-gray-400 font-light">Intelligence</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button variant="outline" className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold transition-all duration-300">
                            View All Reports
                        </Button>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {reports.map((report, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white p-8 border border-gray-100 hover:border-[#E7C873]/50 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 relative overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#E7C873]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-gray-50 group-hover:bg-[#1A1A1A] transition-colors duration-500 rounded-none">
                                        <report.icon className="w-6 h-6 text-[#1A1A1A] group-hover:text-[#E7C873] transition-colors duration-500" />
                                    </div>
                                    <span className="text-xs font-bold text-[#E7C873] bg-[#E7C873]/10 px-3 py-1 uppercase tracking-wider">
                                        {report.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-[#E7C873] transition-colors duration-300">
                                    {report.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                                    {report.description}
                                </p>

                                {/* Footer */}
                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between group-hover:border-[#E7C873]/30 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Published</span>
                                        <span className="text-[#1A1A1A] text-sm font-serif">{report.date}</span>
                                    </div>

                                    <button className="flex items-center gap-2 text-[#1A1A1A] text-xs font-bold uppercase tracking-widest group-hover:text-[#E7C873] transition-colors">
                                        Download
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
