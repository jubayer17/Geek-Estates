export type Project = {
    id: string;
    title: string;
    description?: string;
    image: string;
    location: string;
    date?: string;
    price?: string;
    beds?: number;
    baths?: number;
    area?: number;
    category?: string;
    status?: string;
    featured: boolean;
};

export type ProjectsPageData = {
    id?: string;
    heroBadge: string;
    heroTitle: string;
    heroDescription: string;
    statsCount1: string;
    statsLabel1: string;
    statsCount2: string;
    statsLabel2: string;
    heroImages: string[];
    ctaBadge: string;
    ctaTitleRegular: string;
    ctaTitleItalic: string;
    ctaDescription: string;
    ctaButtonText: string;
};
