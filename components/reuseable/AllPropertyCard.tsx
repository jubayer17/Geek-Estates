"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"

type PropertyCardProps = {
  image: string
  title: string
  address: string
  date: string
  price?: string
  area?: number
  className?: string
}

export default function AllPropertyCard({
  image,
  title,
  address,
  date,
  price,
  area,
  className
}: PropertyCardProps) {

  return (
    <Link
      href="/project-details"
      className={`group block relative w-full ${className}`}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-900 mb-6">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        {/* Floating Action Button */}
        <div className="absolute top-4 right-4 z-20">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                <ArrowUpRight className="text-black w-5 h-5" />
            </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="flex flex-col gap-1 border-t border-white/10 pt-4 group-hover:border-[#C5A059] transition-colors duration-500">
        <div className="flex justify-between items-baseline">
            <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-[#C5A059] transition-colors duration-300">
                {title}
            </h3>
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {date}
            </span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-neutral-500 flex items-center gap-2 group-hover:text-neutral-400 transition-colors">
                <MapPin size={12} className="text-[#C5A059]" />
                {address.replace(", Dhaka", "").trim()}
            </p>
            {area && (
                <span className="text-xs uppercase tracking-widest text-neutral-600">
                    {area} Sq Ft
                </span>
            )}
        </div>
      </div>
    </Link>
  )
}
