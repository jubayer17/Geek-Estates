"use client"

import { useState } from "react"
import { Search } from "lucide-react"
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

  return (
    <div className="w-full px-6 md:px-12 mb-20 sticky top-20 lg:top-24 z-40 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/10 py-6 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">

        {/* Left: Filter Label */}
        <div className="hidden md:block">
          <span className="text-xs uppercase tracking-widest text-neutral-500">Filter Projects</span>
        </div>

        {/* Center: Filters */}
        <div className="flex items-center gap-8 md:gap-12 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">

          {/* Status Select */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-auto border-none bg-transparent p-0 text-sm md:text-base font-medium text-white hover:text-[#C5A059] transition-colors shadow-none focus:ring-0 gap-2 h-auto">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white min-w-[200px]">
              {statusOptions.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className="focus:bg-white/10 focus:text-[#C5A059] cursor-pointer"
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Select */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-auto border-none bg-transparent p-0 text-sm md:text-base font-medium text-white hover:text-[#C5A059] transition-colors shadow-none focus:ring-0 gap-2 h-auto">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white min-w-[200px]">
              {typeOptions.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="focus:bg-white/10 focus:text-[#C5A059] cursor-pointer"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Input Trigger */}
          <div className="relative group flex-1 md:flex-none min-w-[200px]">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full bg-transparent border-b border-white/20 text-white pb-1 placeholder:text-neutral-600 focus:outline-none focus:border-[#C5A059] transition-colors text-sm"
            />
            <Search size={14} className="absolute right-0 top-0 text-neutral-500" />
          </div>
        </div>

        {/* Right: Results Count */}
        <div className="text-right hidden md:block">
          <span className="text-xs uppercase tracking-widest text-neutral-500">12 Projects Found</span>
        </div>
      </div>
    </div>
  )
}
