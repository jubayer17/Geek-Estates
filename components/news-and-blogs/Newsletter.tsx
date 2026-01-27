"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle subscription logic here
        console.log("Subscribed:", email)
        setEmail("")
    }

    return (
        <section className="py-24 px-6 md:px-20 bg-[#1A1A1A] text-white overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7C873]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E7C873]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="h-[2px] w-12 bg-[#E7C873]" />
                            <span className="text-[#E7C873] uppercase tracking-[0.25em] text-xs font-bold">
                                Stay Connected
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                            Join Our Exclusive <br />
                            <span className="italic text-[#E7C873]">Real Estate Community</span>
                        </h2>

                        <p className="text-gray-400 text-lg font-light max-w-md leading-relaxed">
                            Get the latest market insights, property trends, and exclusive investment opportunities delivered directly to your inbox.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-white/10 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7C873]/50 focus:ring-1 focus:ring-[#E7C873]/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#E7C873] hover:bg-[#d4b55f] text-[#1A1A1A] font-bold py-6 text-lg transition-transform duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#E7C873]/20"
                            >
                                Subscribe Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <p className="text-xs text-gray-500 text-center">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
