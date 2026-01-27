"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const statusOptions = ["All", "For Sale", "For Rent", "Upcoming", "Completed"]
const typeOptions = ["All", "Featured", "Not Featured"]

export default function AllPropertiesSearch() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="w-full bg-white border-b border-[#1A1A1A]/10 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row">

          {/* Status Filter */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10 p-6 md:p-10 group hover:bg-[#FAFAFA] transition-colors duration-500 cursor-pointer relative overflow-hidden">
            {/* Hover Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E7C873] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

            <label className="block text-[#E7C873] font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase mb-3 font-bold">Property Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full border-none bg-transparent p-0 text-xl md:text-3xl font-serif text-[#1A1A1A] group-hover:text-[#E7C873] transition-colors duration-300 shadow-none focus:ring-0 gap-2 h-auto rounded-none [&>svg]:opacity-20 [&>svg]:group-hover:opacity-100 [&>svg]:transition-opacity">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#1A1A1A]/5 rounded-none shadow-2xl min-w-[300px] p-0">
                {statusOptions.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="text-lg font-serif text-[#1A1A1A] focus:bg-[#FAFAFA] focus:text-[#E7C873] cursor-pointer rounded-none py-4 px-6 border-b border-[#1A1A1A]/5 last:border-0 transition-colors duration-300"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10 p-6 md:p-10 group hover:bg-[#FAFAFA] transition-colors duration-500 cursor-pointer relative overflow-hidden">
            {/* Hover Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E7C873] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

            <label className="block text-[#E7C873] font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase mb-3 font-bold">Listing Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full border-none bg-transparent p-0 text-xl md:text-3xl font-serif text-[#1A1A1A] group-hover:text-[#E7C873] transition-colors duration-300 shadow-none focus:ring-0 gap-2 h-auto rounded-none [&>svg]:opacity-20 [&>svg]:group-hover:opacity-100 [&>svg]:transition-opacity">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#1A1A1A]/5 rounded-none shadow-2xl min-w-[300px] p-0">
                {typeOptions.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-lg font-serif text-[#1A1A1A] focus:bg-[#FAFAFA] focus:text-[#E7C873] cursor-pointer rounded-none py-4 px-6 border-b border-[#1A1A1A]/5 last:border-0 transition-colors duration-300"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="flex-[1.5] p-6 md:p-10 group hover:bg-[#FAFAFA] transition-colors duration-500 relative flex flex-col justify-center">
            <div className="relative w-full">
              <label className={`block font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase mb-3 font-bold transition-colors duration-300 ${isSearchFocused ? "text-[#E7C873]" : "text-[#1A1A1A]/40"}`}>
                Keywords
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search by location, project, or ID..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full bg-transparent border-none p-0 text-xl md:text-3xl font-serif text-[#1A1A1A] placeholder:text-[#1A1A1A]/20 focus:outline-none focus:ring-0 transition-all duration-300"
                />
                <Search className={`w-6 h-6 transition-colors duration-300 ${isSearchFocused ? "text-[#E7C873]" : "text-[#1A1A1A]/20"}`} />
              </div>

              {/* Animated Bottom Border */}
              <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#1A1A1A]/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: isSearchFocused ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="h-full bg-[#E7C873]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
