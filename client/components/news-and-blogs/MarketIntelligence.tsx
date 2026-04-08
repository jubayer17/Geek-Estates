"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import config from "@/app/config"

// API type
type ApiReport = {
  id: string
  category: string
  title: string
  description: string
  publishDate: string
  downloadUrl: string | null
}

// UI type
type Report = ApiReport & {
  icon: React.ElementType
  formattedDate: string
}

// Category → Icon mapping
const categoryIconMap: Record<string, React.ElementType> = {
  SUSTAINABILITY: PieChart,
  "MARKET ANALYSIS": TrendingUp,
  TECHNOLOGY: BarChart3,
}

export default function MarketIntelligence() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch(`${config.base_url}/reports`)
        if (!res.ok) throw new Error("Failed to fetch reports")

        const data: ApiReport[] = await res.json()

        const mapped: Report[] = data.map((report) => ({
          ...report,
          icon: categoryIconMap[report.category] || TrendingUp,
          formattedDate: new Date(report.publishDate).toLocaleDateString(
            undefined,
            { year: "numeric", month: "short" }
          ),
        }))

        setReports(mapped)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (loading) {
    return <div className="py-24 text-center text-gray-400">Loading reports…</div>
  }

  if (error) {
    return <div className="py-24 text-center text-red-500">{error}</div>
  }

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
              <span className="w-8 h-px bg-[#E7C873]" />
              Data & Research
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
              Market <span className="italic text-gray-400 font-light">Intelligence</span>
            </h2>
          </motion.div>

          <Button
            variant="outline"
            className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold"
          >
            View All Reports
          </Button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reports.map((report, index) => {
            const Icon = report.icon

            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-8 border border-gray-100 hover:border-[#E7C873]/50 transition-all duration-500 hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#E7C873]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-gray-50 group-hover:bg-[#1A1A1A] transition-colors duration-500">
                      <Icon className="w-6 h-6 text-[#1A1A1A] group-hover:text-[#E7C873]" />
                    </div>
                    <span className="text-xs font-bold text-[#E7C873] bg-[#E7C873]/10 px-3 py-1 uppercase tracking-wider">
                      {report.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-[#E7C873]">
                    {report.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                    {report.description}
                  </p>

                  {/* Footer */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Published
                      </span>
                      <div className="text-[#1A1A1A] text-sm font-serif">
                        {report.formattedDate}
                      </div>
                    </div>

                    {report.downloadUrl && (
                      <a
                        href={report.downloadUrl}
                        target="_blank"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#E7C873]"
                      >
                        Download
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
