export interface AboutUsText {
  id: string;
  title: string;
  subtitle: string;
}

export interface AboutUsBannerImage {
  id: string;
  url: string;
  text?: string;
  type: string;
}

export interface AboutWhoWeAre {
  id: string;
  title: string;
  description: string;
  order: number;
  imageUrl?: string;
}

export interface AboutUsCoreValue {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface AboutUsAward {
  id: string;
  title: string;
  subtitle: string;
  year: string;
}

export interface AboutUsJourney {
  id: string;
  startYear: string;
  endYear: string;
  title: string;
  description: string;
}

export interface AboutUsLeadershipMember {
  id: string;
  name: string;
  designation: string;
  quote?: string;
  imageUrl?: string;
}

export interface AboutUsTestimonial {
  id: string;
  name: string;
  designation: string;
  message: string;
  rating: number;
  company: string;
}
