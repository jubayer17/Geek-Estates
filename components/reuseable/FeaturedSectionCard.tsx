import React from "react"
import PropertyCard from "./PropertyCard"


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

type PropertyGridProps = {
  properties: Property[]
  limit?: number        
  className?: string    
}

export const FeaturedSectionCard: React.FC<PropertyGridProps> = ({
  properties,
  limit=3,
  className,
}) => {
  const displayed = limit ? properties.slice(0, limit) : properties

  return (
    <div
      className={`overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center items-center ${className ?? ""}`}
    >
      {displayed.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  )
}
