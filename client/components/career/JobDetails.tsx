"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    ArrowLeft, MapPin, Clock, DollarSign, Calendar, CheckCircle,
    Briefcase, ArrowUpRight, Share2, Copy, Linkedin, Twitter,
    Building2, Globe, Users, Coffee
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { toast } from "sonner"
import CareerForm from "./Careerform"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

gsap.registerPlugin(ScrollTrigger)

type Job = {
    id: number
    title: string
    description: string
    longDescription?: string
    responsibilities?: string[]
    requirements?: string[]
    salary: string
    experience: string
    location: string
    deadline: string
    jobType?: string
    vacancies?: string
    category?: string
    gender?: string
}

export default function JobDetails({ job }: { job: Job }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(
                headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                }
            )

            // Content Animation
            gsap.fromTo(
                contentRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power3.out",
                }
            )

            // Sidebar Animation
            gsap.fromTo(
                sidebarRef.current,
                { x: 30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power3.out",
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard!")
    }

    const deadlineDate = new Date(job.deadline)

    return (
        <div ref={containerRef} className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-16 relative bg-white">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-gradient-to-b from-[#E7C873]/5 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-0 opacity-[0.02] pointer-events-none select-none hidden lg:block">
                <Briefcase className="w-[40rem] h-[40rem] text-[#1A1A1A]" />
            </div>

            {/* Back Navigation */}
            <div className="mb-12 relative z-10">
                <Link
                    href="/career"
                    className="inline-flex items-center text-gray-500 hover:text-[#E7C873] transition-colors group"
                >
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mr-3 group-hover:border-[#E7C873] group-hover:bg-[#E7C873] transition-all duration-300">
                        <ArrowLeft className="w-4 h-4 group-hover:text-white transition-colors" />
                    </div>
                    <span className="uppercase tracking-widest text-xs font-bold">Back to Careers</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Main Content Area */}
                <div className="lg:col-span-8">
                    {/* Header Section */}
                    <div ref={headerRef} className="mb-16 border-b border-gray-100 pb-12">
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <span className="px-4 py-1.5 bg-[#1F4B43] text-white text-xs font-bold uppercase tracking-widest rounded-full">
                                {job.jobType || "Full Time"}
                            </span>
                            {job.location === "Remote" && (
                                <span className="px-4 py-1.5 bg-[#E7C873]/20 text-[#b39642] text-xs font-bold uppercase tracking-widest rounded-full">
                                    Remote Friendly
                                </span>
                            )}
                            <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-full">
                                {job.experience} Exp
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-8 leading-[1.1]">
                            {job.title}
                        </h1>

                        <div className="flex flex-wrap gap-y-4 gap-x-8 text-gray-600 font-light text-lg">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-3 text-[#E7C873]" />
                                {job.location}
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="w-5 h-5 mr-3 text-[#E7C873]" />
                                {job.salary} / year
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-3 text-[#E7C873]" />
                                Posted {format(new Date(), "MMM dd")}
                            </div>
                        </div>
                    </div>

                    {/* Job Details Body */}
                    <div ref={contentRef} className="space-y-16">
                        {/* About The Role */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-[2px] bg-[#E7C873]" />
                                <h3 className="text-2xl font-serif text-[#1A1A1A]">About the Role</h3>
                            </div>
                            <p className="text-gray-600 font-light leading-relaxed text-lg lg:text-xl">
                                {job.longDescription || job.description}
                            </p>
                        </section>

                        {/* Responsibilities */}
                        {job.responsibilities && (
                            <section className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-8 flex items-center gap-3">
                                    <Briefcase className="w-6 h-6 text-[#E7C873]" />
                                    Key Responsibilities
                                </h3>
                                <ul className="space-y-4">
                                    {job.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start group">
                                            <div className="mt-1.5 mr-4 flex-shrink-0">
                                                <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#E7C873] group-hover:bg-[#E7C873] transition-all duration-300">
                                                    <CheckCircle className="w-3.5 h-3.5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                                                </div>
                                            </div>
                                            <span className="text-gray-600 font-light leading-relaxed group-hover:text-[#1A1A1A] transition-colors">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Requirements */}
                        {job.requirements && (
                            <section>
                                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-8 flex items-center gap-3">
                                    <Users className="w-6 h-6 text-[#E7C873]" />
                                    Requirements
                                </h3>
                                <ul className="grid grid-cols-1 gap-4">
                                    {job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start group p-4 hover:bg-gray-50 rounded-lg transition-colors duration-300 border border-transparent hover:border-gray-100">
                                            <div className="mt-2 mr-4 flex-shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-[#E7C873]" />
                                            </div>
                                            <span className="text-gray-600 font-light leading-relaxed text-lg">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Benefits Mini-Grid */}
                        <section>
                            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-8">Why Join Us?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#E7C873]/30 transition-all duration-300">
                                    <Globe className="w-8 h-8 text-[#E7C873] mb-4" />
                                    <h4 className="font-bold text-[#1A1A1A] mb-2">Remote Friendly</h4>
                                    <p className="text-sm text-gray-500 font-light">Work from anywhere in the world.</p>
                                </div>
                                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#E7C873]/30 transition-all duration-300">
                                    <Coffee className="w-8 h-8 text-[#E7C873] mb-4" />
                                    <h4 className="font-bold text-[#1A1A1A] mb-2">Flexible Hours</h4>
                                    <p className="text-sm text-gray-500 font-light">We focus on output, not hours.</p>
                                </div>
                                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#E7C873]/30 transition-all duration-300">
                                    <DollarSign className="w-8 h-8 text-[#E7C873] mb-4" />
                                    <h4 className="font-bold text-[#1A1A1A] mb-2">Competitive Pay</h4>
                                    <p className="text-sm text-gray-500 font-light">Top-tier salary and equity packages.</p>
                                </div>
                                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#E7C873]/30 transition-all duration-300">
                                    <Building2 className="w-8 h-8 text-[#E7C873] mb-4" />
                                    <h4 className="font-bold text-[#1A1A1A] mb-2">Modern Office</h4>
                                    <p className="text-sm text-gray-500 font-light">State of the art equipment and space.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sidebar */}
                <div ref={sidebarRef} className="lg:col-span-4 relative">
                    <div className="sticky top-28 space-y-8">

                        {/* Unified Job Overview Card */}
                        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl space-y-8">
                            {/* Header */}
                            <div>
                                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-2">Job Overview</h3>
                                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                                    Quick facts about this role
                                </p>
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid grid-cols-1 gap-6 text-sm">
                                <div>
                                    <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Job Title</p>
                                    <p className="text-[#1A1A1A] font-medium mt-1 text-base">{job.title}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Job Type</p>
                                        <p className="text-[#1A1A1A] font-medium mt-1 text-base">
                                            {job.jobType || "Full Time"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Vacancies</p>
                                        <p className="text-[#1A1A1A] font-medium mt-1 text-base">
                                            {job.vacancies || "1"}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Category</p>
                                        <p className="text-[#1A1A1A] font-medium mt-1 text-base">
                                            {job.category || "General"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Experience</p>
                                        <p className="text-[#1A1A1A] font-medium mt-1 text-base">
                                            {job.experience}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Gender</p>
                                        <p className="text-[#1A1A1A] font-medium mt-1 text-base">
                                            {job.gender || "Any"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-[0.18em] text-[11px] font-bold">Location</p>
                                        <p className="text-[#1A1A1A] font-medium mt-1 text-base">
                                            {job.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            {/* Actions Section */}
                            <div className="space-y-6">
                                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-[#E7C873] hover:bg-[#d4b55f] text-[#1A1A1A] font-bold py-6 text-lg transition-transform duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                                            Apply Now
                                            <ArrowUpRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-serif text-[#1A1A1A]">
                                                Apply for {job.title}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                            <CareerForm job={job} />
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-red-400 text-sm font-bold flex items-center bg-red-50 px-4 py-2 rounded-full border border-red-100">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Deadline: {format(deadlineDate, "MMM dd, yyyy")}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
