"use client"

import Image from "next/image"
import bannerImage from "../../public/5.avif"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function AllPropertiesBanner() {
  
  const { scrollY } = useScroll()
  const rawScale = useTransform(scrollY, [0, 600], [1, 1.2])
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30, mass: 1 })

  
  const rawOverlayOpacity = useTransform(scrollY, [0, 600], [0, 0.5])
  const overlayOpacity = useSpring(rawOverlayOpacity, { stiffness: 100, damping: 30, mass: 1 })

  
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 150) setShowText(true)
      else setShowText(false)
    })
  }, [scrollY])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Zoomable Image */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="All Properties Banner"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black"
      />

      {/* Text overlay */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={showText ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute bottom-10 left-10 text-white text-5xl md:text-6xl font-bold select-none"
      >
        Meet Your Dream Home
      </motion.h1>
    </div>
  )
}
