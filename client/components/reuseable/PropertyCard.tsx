import Image from "next/image"
import { MapPin, BedDouble, Bath, Square } from "lucide-react"

type PropertyCardProps = {
  image: string
  title: string
  address: string
  price: string
  beds: number
  baths: number
  area: number
  status?: string
  featured?: boolean
}

export default function PropertyCard({
  image,
  title,
  address,
  price,
  beds,
  baths,
  area,
  status = "For Sale",
  featured = false,
}: PropertyCardProps) {
  return (
    <div className="relative w-full max-w-[400px] sm:max-w-none rounded-2xl shadow-md hover:shadow-lg transition bg-white mx-auto">

      {/* Image Section */}
      <div className="relative h-52 sm:h-60 md:h-64 lg:h-72 rounded-t-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2 z-10">
          <span className="rounded-full bg-green-700 px-2.5 py-1 sm:px-3 text-xs text-white">
            {status}
          </span>

          {featured && (
            <span className="rounded-full bg-yellow-400 px-2.5 py-1 sm:px-3 text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content - Overlapping Box */}
      <div className="relative -mt-12 sm:-mt-14 md:-mt-16 bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg mx-3 sm:mx-4 z-20 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold mb-1 text-[#1A1A1A] line-clamp-1">{title}</h3>

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
          <MapPin size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="line-clamp-1">{address}</span>
        </div>

        <p className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">{price}</p>

        {/* Property Info */}
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 border-t pt-3 sm:pt-4">
          <div className="flex items-center gap-1">
            <BedDouble size={14} className="sm:w-4 sm:h-4" />
            <span>{beds}</span>
          </div>

          <div className="flex items-center gap-1">
            <Bath size={14} className="sm:w-4 sm:h-4" />
            <span>{baths}</span>
          </div>

          <div className="flex items-center gap-1">
            <Square size={14} className="sm:w-4 sm:h-4" />
            <span>{area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  )
}
