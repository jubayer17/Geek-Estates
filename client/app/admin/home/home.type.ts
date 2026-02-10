export type Banner = {
  id: string
  badgeText: string
  title: string
  subtitle: string
  imageUrl: string
  buttonText1: string
  buttonText2: string
  updatedAt?: string
}


export interface HomeText {
  id: string
  journeyTag: string
  title: string
  emphasis: string
  description: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface FeaturedImage {
  id: string
  order: number
  label: string
  title: string
  description: string
  imageUrl: string
  iconUrl: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}


export interface ExperienceText {
  id: string
  number: number
  suffix: string
  title: string
  description: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}



