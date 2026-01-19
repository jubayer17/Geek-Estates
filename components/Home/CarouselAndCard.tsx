"use client"

import * as React from "react"
import Image from "next/image"
import gsap from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const locations = [
  {
    title: "Chicago",
    count: "2 Properties",
    image: "/carousel1.jpeg",
  },
  {
    title: "Los Angeles",
    count: "1 Property",
    image: "/carousel2.jpeg",
  },
  {
    title: "Miami",
    count: "2 Properties",
    image: "/carousel3.jpeg",
  },
  {
    title: "Florida",
    count: "3 Properties",
    image: "/carousel3.jpeg",
  },
  {
    title: "Chicago",
    count: "2 Properties",
    image: "/carousel1.jpeg",
  },
  {
    title: "Los Angeles",
    count: "1 Property",
    image: "/carousel2.jpeg",
  },
  {
    title: "Miami",
    count: "2 Properties",
    image: "/carousel3.jpeg",
  },
  {
    title: "Florida",
    count: "3 Properties",
    image: "/carousel3.jpeg",
  },
]

export default function LocationCarousel() {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])

  React.useEffect(() => {
    if (!api) return

    const update = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    update()

    api.on("select", update)
    api.on("reInit", update)

    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  // Card hover animations
  const handleCardHover = (index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      gsap.to(card, {
        scale: 1.03,
        y: -8,
        duration: 0.4,
        ease: "power2.out"
      })
    }
  }

  const handleCardLeave = (index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
    }
  }

  // Button hover animations
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const scrollPrev = () => api?.scrollPrev()
  const scrollNext = () => api?.scrollNext()

  return (
    <div className="w-full">
      <div className="relative">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {locations.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 sm:pl-4 basis-[55%] sm:basis-[50%] md:basis-[40%] lg:basis-[28%] xl:basis-1/4"
              >
                <div
                  ref={(el) => { cardRefs.current[index] = el }}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={() => handleCardLeave(index)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden py-0 rounded-xl sm:rounded-2xl border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-xl sm:rounded-2xl"
                        sizes="(max-width: 640px) 55vw,
                               (max-width: 768px) 50vw,
                               (max-width: 1024px) 40vw,
                               25vw"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl sm:rounded-2xl" />

                      {/* Text overlay */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-white">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs md:text-sm opacity-90">
                          {item.count}
                        </p>
                      </div>

                      {/* Explore button - appears on hover */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium hover:bg-white transition-colors">
                          Explore Properties
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          disabled={!canScrollPrev}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-1/2 z-10",
            "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg",
            "flex items-center justify-center",
            "border border-gray-200 hover:border-[#1F4B43] hover:bg-[#1F4B43] hover:text-white",
            "transition-colors duration-300",
            !canScrollPrev && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={scrollNext}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          disabled={!canScrollNext}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-1/2 z-10",
            "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg",
            "flex items-center justify-center",
            "border border-gray-200 hover:border-[#1F4B43] hover:bg-[#1F4B43] hover:text-white",
            "transition-colors duration-300",
            !canScrollNext && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Pagination dots */}
      {count > 0 && (
        <div className="mt-6 sm:mt-8 flex justify-center gap-1.5 sm:gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300",
                current === index
                  ? "bg-[#1F4B43] w-6 sm:w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
