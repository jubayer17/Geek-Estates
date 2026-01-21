"use client"

import { forwardRef } from "react"
import { Star } from "lucide-react"

interface TestimonialStatsProps {
    happyPeople: string
    overallRating: string
}

const TestimonialStats = forwardRef<HTMLDivElement, TestimonialStatsProps>(
    ({ happyPeople, overallRating }, ref) => {
        return (
            <div ref={ref} className="flex gap-10 sm:gap-16 mt-8">
                {/* Happy People */}
                <div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900">{happyPeople}</p>
                    <p className="text-gray-600 text-sm mt-1">Happy People</p>
                </div>

                {/* Overall Rating */}
                <div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900">{overallRating}</p>
                    <p className="text-gray-600 text-sm mt-1">Overall rating</p>
                    {/* Stars */}
                    <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                className="fill-yellow-400 text-yellow-400"
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
)

TestimonialStats.displayName = "TestimonialStats"

export default TestimonialStats
