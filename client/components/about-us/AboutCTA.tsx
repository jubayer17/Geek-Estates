"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutCTA() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative border border-gray-100 bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.05)] p-8 md:p-20 overflow-hidden"
                >
                    {/* Animated Corners */}
                    <motion.div
                        initial={{ width: 0, height: 0 }}
                        whileInView={{ width: 80, height: 80 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute top-0 left-0 border-t-2 border-l-2 border-[#E7C873]"
                    />
                    <motion.div
                        initial={{ width: 0, height: 0 }}
                        whileInView={{ width: 80, height: 80 }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                        className="absolute bottom-0 right-0 border-b-2 border-r-2 border-[#E7C873]"
                    />

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100px" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-1 bg-[#1A1A1A] mb-8"
                            />
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.1]"
                            >
                                Let&apos;s Build <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E7C873] to-[#C5A555]">
                                    Your Legacy
                                </span>
                            </motion.h2>
                        </div>

                        <div className="flex flex-col gap-8">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-gray-600 text-lg md:text-xl font-light leading-relaxed border-l-4 border-gray-100 pl-6"
                            >
                                Whether you&apos;re looking to acquire a masterpiece or sell a treasured estate, our team provides the discretion, expertise, and global reach you deserve.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-5 pt-4"
                            >
                                <Link href="/for-rent">
                                    <Button className="bg-[#1A1A1A] hover:bg-[#333] text-white px-10 py-7 text-lg rounded-none min-w-[200px] group relative overflow-hidden transition-all duration-300">
                                        <span className="relative z-10 flex items-center">
                                            Find a Home
                                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-10 py-7 text-lg rounded-none min-w-[200px] transition-all duration-300">
                                        Contact Us
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
