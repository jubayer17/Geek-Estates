"use client"

import Image from "next/image"
import { useState } from "react"

type PropertyCardProps = {
  image: string
  title: string
  address: string
  date: string
}

export default function AllPropertyCard({
  image,
  title,
  address,
  date,
}: PropertyCardProps) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className="w-full max-w-sm mx-auto group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* IMAGE */}
      <div className="relative w-full h-[460px] overflow-hidden shadow-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            ease-[cubic-bezier(0.19,1,0.22,1)]
            group-hover:scale-[1.2]
          "
        />

        {/* DATE */}
        {/* <div className="absolute top-4 left-4 bg-white text-black px-3 py-2 text-sm font-semibold shadow z-10">
          <div>{date.split(" ")[0]}</div>
          <div className="text-xs">{date.split(" ")[1]}</div>
        </div> */}

        {/* CURSOR FOLLOW */}
        <div
          className={`absolute pointer-events-none transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-28 h-28 rounded-full bg-[#e7c873] text-black flex items-center justify-center text-sm font-semibold shadow-2xl">
            View Details
          </div>
        </div>
      </div>

      {/* TEXT */}
      <div className="mt-6 text-center">
        <h3 className="text-xs tracking-widest uppercase font-semibold">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {address.replace(", Dhaka", "").trim()}
        </p>
      </div>
    </div>
  )
}
