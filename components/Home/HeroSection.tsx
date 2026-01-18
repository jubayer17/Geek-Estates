import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Home, Building2, Building, Search } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      className="relative min-h-dvh md:min-h-[90vh] flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/BannerImage.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full text-center">
        
        {/* Top badge */}
        <Badge
          variant="outline"
          className="mb-4 md:mb-6 rounded-full px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm border-emerald-700 text-emerald-900 bg-white/80 backdrop-blur"
        >
          LET US GUIDE YOUR HOME
        </Badge>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-emerald-900 leading-tight">
          Believe in finding it
        </h1>

        {/* Subtitle */}
        <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-emerald-900 max-w-xl mx-auto">
          Search properties for sale and to rent in the UK
        </p>

        {/* Search bar */}
        <div className="mt-8 md:mt-10 flex items-center bg-white rounded-full shadow-lg max-w-full sm:max-w-3xl mx-auto p-2">
          <Input
            placeholder="Enter Name, Keywords..."
            className="border-none focus-visible:ring-0 text-sm sm:text-base px-4 sm:px-6"
          />
          <Button
            size="icon"
            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black h-10 w-10 sm:h-12 sm:w-12"
          >
            <Search/>
          </Button>
        </div>

        {/* Property types */}
        <p className="mt-6 md:mt-8 text-xs sm:text-sm text-white/90">
          What are you looking for?
        </p>

        <div className="mt-3 md:mt-4 flex flex-wrap justify-center gap-2 sm:gap-4">
          <Button
            variant="secondary"
            className="rounded-full px-4 sm:px-6 py-2 sm:py-4 gap-2 text-xs sm:text-sm"
          >
            <Home size={16} />
            Modern Villa
          </Button>

          <Button
            variant="secondary"
            className="rounded-full px-4 sm:px-6 py-2 sm:py-4 gap-2 text-xs sm:text-sm"
          >
            <Building2 size={16} />
            Apartment
          </Button>

          <Button
            variant="secondary"
            className="rounded-full px-4 sm:px-6 py-2 sm:py-4 gap-2 text-xs sm:text-sm"
          >
            <Building size={16} />
            Town House
          </Button>
        </div>
      </div>
    </section>
  )
}
