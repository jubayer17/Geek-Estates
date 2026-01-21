"use client"

import { useState, useMemo } from "react"
import propertiesData from "../../public/data/properties.json" // adjust path

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type Property = {
  id: number
  image: string
  title: string
  address: string
  price: string
  beds: number
  baths: number
  area: number
  status: string
  featured: boolean
}

// Remove ", Dhaka" from addresses
const cleanAddress = (address: string) => address.replace(", Dhaka", "").trim()

const statusOptions = [
  "All",
  "For Sale",
  "For Rent",
  "Upcoming",
  "Ongoing",
  "Completed",
]

const typeOptions = ["All", "Featured", "Not Featured"]

export default function PropertySearch() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")

  // Extract unique locations dynamically
  const locations = useMemo(() => {
    const locSet = new Set<string>()
    propertiesData.forEach((p: Property) => {
      locSet.add(cleanAddress(p.address))
    })
    return ["All", ...Array.from(locSet)]
  }, [])

  // Function to run on button click
  const handleSearch = () => {
    console.log("Selected Status:", selectedStatus)
    console.log("Selected Type:", selectedType)
    console.log("Selected Location:", selectedLocation)

    // Optional: filter properties
    const filteredProperties = propertiesData.filter((p: Property) => {
      const statusMatch =
        selectedStatus === "All" || p.status === selectedStatus

      const typeMatch =
        selectedType === "All" ||
        (selectedType === "Featured" && p.featured) ||
        (selectedType === "Not Featured" && !p.featured)

      const locationMatch =
        selectedLocation === "All" || cleanAddress(p.address) === selectedLocation

      return statusMatch && typeMatch && locationMatch
    })

    console.log("Filtered Properties:", filteredProperties)
  }

  return (
    <div className="bg-transparent p-6 rounded-xl shadow-md w-full mx-auto flex flex-wrap items-center justify-center gap-4">
      {/* Status */}
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-48 border border-gray-200 shadow-sm rounded-md">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type */}
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-48 border border-gray-200 shadow-sm rounded-md">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location */}
      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger className="w-48 border border-gray-200 shadow-sm rounded-md">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Button */}
      <button
        type="button"
        className="flex items-center justify-center rounded-lg bg-[#e7c873] text-black px-6 py-3 hover:bg-blue-700 hover:text-white transition"
        onClick={handleSearch} 
      >
        {/* Magnifying glass icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
          />
        </svg>
        Search
      </button>
    </div>
  )
}
