"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  {
    value: 1500,
    suffix: "+",
    label: "Properties Sold",
    description: "Successfully closed deals across premium locations"
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on post-purchase feedback and ratings"
  },
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
    description: "Deep market knowledge and industry expertise"
  },
  {
    value: 250,
    suffix: "M+",
    label: "Sales Volume",
    description: "Total value of properties sold in USD"
  }
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-[#1A1A1A] border-y border-white/5" ref={ref}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="px-8 py-8 md:py-0"> {/* Wrapper for divider padding */}
              <CounterItem stat={stat} index={index} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CounterItem({ stat, index, isInView }: { stat: { value: number; suffix: string; label: string; description: string }, index: number, isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepTime = duration / steps
      const increment = stat.value / steps

      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCount(stat.value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepTime)

      return () => clearInterval(timer)
    }
  }, [isInView, stat.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-left md:text-center"
    >
      <div className="flex items-baseline justify-start md:justify-center mb-2">
        <span className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
          {count}
        </span>
        <span className="text-2xl md:text-4xl font-serif text-[#E7C873] ml-1">
          {stat.suffix}
        </span>
      </div>
      <p className="text-[#E7C873] text-xs font-bold uppercase tracking-[0.2em] mb-3">{stat.label}</p>
      <p className="text-sm text-gray-500 font-light leading-relaxed max-w-[200px] md:mx-auto">{stat.description}</p>
    </motion.div>
  )
}
