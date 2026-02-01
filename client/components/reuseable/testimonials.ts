export type Testimonial = {
    id: number
    name: string
    role: string
    location: string
    image: string
    rating: number
    quote: string
    property: string
    purchaseValue?: string
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "James Thornton",
        role: "Founder & CEO, Thornton Group",
        location: "New York, USA",
        image: "/images/testimonials/james.jpg",
        rating: 5,
        quote: "From the first consultation to the final signature, the experience was nothing short of exceptional. Every detail was handled with precision and care.",
        property: "One Hyde Park Penthouse",
        purchaseValue: "$4.2M"
    },
    {
        id: 2,
        name: "Ayesha Rahman",
        role: "Managing Director, Rahman Holdings",
        location: "Dhaka, Bangladesh",
        image: "/images/testimonials/ayesha.jpg",
        rating: 5,
        quote: "They understood exactly what I was looking for. The team guided me through every step and delivered beyond my expectations.",
        property: "Gulshan Lake View Residence",
        purchaseValue: "$1.1M"
    },
    {
        id: 3,
        name: "Daniel Weber",
        role: "Investment Partner, Weber Capital",
        location: "Berlin, Germany",
        image: "/images/testimonials/daniel.jpg",
        rating: 4,
        quote: "Professional, transparent, and incredibly responsive. I felt confident making a high-value investment with their guidance.",
        property: "Central Park Skyline Apartment",
        purchaseValue: "$2.7M"
    },
    {
        id: 4,
        name: "Sophia Martinez",
        role: "Creative Director, Lumina Studio",
        location: "Barcelona, Spain",
        image: "/images/testimonials/sophia.jpg",
        rating: 5,
        quote: "The process was smooth and stress-free. Their market knowledge helped me secure a property I truly love.",
        property: "Mediterranean Sea View Villa",
        purchaseValue: "$3.5M"
    },
    {
        id: 5,
        name: "Omar Al-Fayed",
        role: "Chairman, Al-Fayed Developments",
        location: "Dubai, UAE",
        image: "/images/testimonials/omar.jpg",
        rating: 5,
        quote: "An elite level of service. Their attention to detail and negotiation skills are unmatched in the luxury real estate market.",
        property: "Palm Jumeirah Sky Mansion",
        purchaseValue: "$6.8M"
    }
]
