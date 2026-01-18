"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

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

  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  React.useEffect(() => {
    if (!api) return

    const update = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
    }

    update()
    api.on("select", update)
    api.on("reInit", update)

    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  return (
    <div className="mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[autoplay.current]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {locations.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="overflow-hidden py-0 rounded-xl border-0 transition-all duration-300 hover:shadow-xl hover:translate-y-2 hover:border-2">
                <div className="relative h-105 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Text overlay */}
                  <div className="absolute top-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.count}</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination dots */}
      {count > 0 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2.5 w-2.5 rounded-full border-2 transition-colors",
                current === index
                  ? "bg-black border-black"
                  : "bg-transparent border-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
