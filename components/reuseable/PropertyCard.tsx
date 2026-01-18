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
    <div className="relative rounded-2xl shadow-md hover:shadow-lg transition  mx-auto bg-white">

      {/* Image Section */}
      <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-t-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="rounded-full bg-green-700 px-3 py-1 text-xs text-white">
            {status}
          </span>

          {featured && (
            <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content - Overlapping Box */}
      <div className="relative -mt-16 bg-white rounded-2xl p-6 shadow-lg mx-4 z-20">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin size={16} />
          <span>{address}</span>
        </div>

        <p className="text-xl font-bold text-primary mb-4">{price}</p>

        {/* Property Info */}
        <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            <span>{beds}</span>
          </div>

          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{baths}</span>
          </div>

          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{area} sqft</span>
          </div>
        </div>
      </div>

    </div>
  )
}
