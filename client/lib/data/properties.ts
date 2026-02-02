// File: lib/data/properties.ts

export type PropertyData = {
    id: number
    name: string
    location?: string
    price?: string
    image: string // outdoor image (mother)
    indoorImages: string[] // multiple indoor images (children)
    video?: string
    tags?: string[]
}

export const properties: PropertyData[] = [
    {
        id: 1,
        name: 'Seaside Villa',
        location: '12 Ocean Drive, Santa Maria',
        price: '$420,000',
        image: '/outdoor-real-state/1.webp',
        indoorImages: [
            '/indoor-real-state/1.webp',
            '/indoor-real-state/2.webp',
            '/indoor-real-state/3.webp'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_1',
        tags: ['For Sale', 'Sea View']
    },
    {
        id: 2,
        name: 'Modern Bungalow',
        location: '78 Cedar Lane, Greenfield',
        price: '$295,000',
        image: '/outdoor-real-state/2.webp',
        indoorImages: [
            '/indoor-real-state/2.webp',
            '/indoor-real-state/4.webp',
            '/indoor-real-state/5.webp',
            '/indoor-real-state/1.webp'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_2',
        tags: ['Featured', 'New']
    },
    {
        id: 3,
        name: 'Country Cottage',
        location: '4 Oak Hollow, Willow',
        price: '$185,000',
        image: '/outdoor-real-state/3.webp',
        indoorImages: [
            '/indoor-real-state/3.webp',
            '/indoor-real-state/6.webp',
            '/indoor-real-state/5.webp'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_3',
        tags: ['For Sale']
    },
    {
        id: 4,
        name: 'Urban Loft',
        location: '101 Central Ave, Metro',
        price: '$360,000',
        image: '/outdoor-real-state/4.webp',
        indoorImages: [
            '/indoor-real-state/4.webp',
            '/indoor-real-state/1.webp',
            '/indoor-real-state/2.webp',
            '/indoor-real-state/6.webp'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_4',
        tags: ['Featured', 'City']
    },
    {
        id: 5,
        name: 'Riverside Retreat',
        location: '9 Riverside Walk, Amber',
        price: '$498,000',
        image: '/outdoor-real-state/5.webp',
        indoorImages: [
            '/indoor-real-state/5.webp',
            '/indoor-real-state/2.webp',
            '/indoor-real-state/3.webp'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_5',
        tags: ['Luxury']
    },
    {
        id: 6,
        name: 'Hilltop Residence',
        location: '55 Summit Road, Crest',
        price: '$540,000',
        image: '/outdoor-real-state/6.webp',
        indoorImages: [
            '/indoor-real-state/6.webp',
            '/indoor-real-state/4.webp',
            '/indoor-real-state/1.webp'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_6',
        tags: ['For Sale', 'Panorama']
    },
    {
        id: 7,
        name: 'Suburban Dream',
        location: '23 Parkside Blvd, Meadow',
        price: '$215,000',
        image: '/outdoor-real-state/7.avif',
        indoorImages: [
            '/indoor-real-state/1.avif',
            '/indoor-real-state/5.avif',
            '/indoor-real-state/6.avif'
        ],
        video: 'https://www.youtube.com/watch?v=VIDEOID_7',
        tags: ['Family']
    }
]
