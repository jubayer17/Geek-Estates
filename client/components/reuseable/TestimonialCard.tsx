"use client"

import { forwardRef } from "react"
import Image from "next/image"

interface TestimonialCardProps {
    name: string
    role: string
    image: string
    quote: string
}

const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
    ({ name, role, image, quote }, ref) => {
        return (
            <div ref={ref} className="w-full">
                {/* User Info Row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Name & Role */}
                        <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
                            <p className="text-gray-500 text-sm">{role}</p>
                        </div>
                    </div>

                    {/* Quote Icon */}
                    <div className="text-6xl font-serif text-gray-800 leading-none select-none">
                        &quot;
                    </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
                    {quote}
                </p>
            </div>
        )
    }
)

TestimonialCard.displayName = "TestimonialCard"

export default TestimonialCard
