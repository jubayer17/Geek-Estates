import { CreateFeaturedImageDto, CreateHeroBannerDto, CreateLegacySectionDto, UpdateFeaturedImageDto, UpdateLegacySectionDto } from './homeDTO';
export declare class HomeService {
    createHeroBanner(dto: CreateHeroBannerDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            badgeText: string | null;
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    getHeroBanners(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            badgeText: string | null;
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            buttonText1: string | null;
            buttonText2: string | null;
        }[];
    }>;
    getHeroBannerById(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            badgeText: string | null;
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    updateHeroBanner(id: string, dto?: Partial<{
        badgeText: string;
        title: string;
        subtitle: string;
        isActive: boolean;
    }>, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            badgeText: string | null;
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    deleteHeroBanner(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    textSectionCreate(dto: CreateLegacySectionDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    textSectionGetAll(): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }[]>;
    textSectionGetById(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    textSectionUpdate(id: string, dto: UpdateLegacySectionDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    textSectionRemove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    featuredImageCreate(dto: CreateFeaturedImageDto, image?: Express.Multer.File, icon?: Express.Multer.File): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        label: string;
        imageUrl: string;
        iconUrl: string | null;
    }>;
    featuredImageGetAll(): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        label: string;
        imageUrl: string;
        iconUrl: string | null;
    }[]>;
    featuredImageGetById(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        label: string;
        imageUrl: string;
        iconUrl: string | null;
    }>;
    featuredImageUpdate(id: string, dto: UpdateFeaturedImageDto, image?: Express.Multer.File, icon?: Express.Multer.File): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        label: string;
        imageUrl: string;
        iconUrl: string | null;
    }>;
    featuredImageDelete(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        label: string;
        imageUrl: string;
        iconUrl: string | null;
    }>;
    getCompanyExperience(): Promise<{
        number: number;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        suffix: string | null;
    }[]>;
    getCompanyExperienceById(id: string): Promise<{
        number: number;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        suffix: string | null;
    }>;
    createCompanyExperience(data: any): Promise<{
        number: number;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        suffix: string | null;
    }>;
    updateCompanyExperience(id: string, data: any): Promise<{
        number: number;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        suffix: string | null;
    }>;
    deleteCompanyExperience(id: string): Promise<{
        number: number;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        suffix: string | null;
    }>;
    property_search_stepCreate(data: any, files?: {
        image?: Express.Multer.File[];
        icons?: Express.Multer.File[];
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        imageUrl: string;
        stepNumber: number;
        statusText: string | null;
        statusIcon: string | null;
    }>;
    property_search_stepsGetAll(): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        imageUrl: string;
        stepNumber: number;
        statusText: string | null;
        statusIcon: string | null;
    }[]>;
    property_search_stepGetByID(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        imageUrl: string;
        stepNumber: number;
        statusText: string | null;
        statusIcon: string | null;
    }>;
    property_search_stepUpdate(id: string, data?: any, files?: {
        image?: Express.Multer.File[];
        icons?: Express.Multer.File[];
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        imageUrl: string;
        stepNumber: number;
        statusText: string | null;
        statusIcon: string | null;
    }>;
    property_search_stepDelete(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        imageUrl: string;
        stepNumber: number;
        statusText: string | null;
        statusIcon: string | null;
    }>;
    getContactInfo(): Promise<{
        openingHours: {
            id: string;
            days: string;
            openTime: string | null;
            closeTime: string | null;
            isClosed: boolean;
            contactInfoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullAddress: string;
        country: string;
        phone: string;
    }>;
    createContactInfo(data: any): Promise<{
        openingHours: {
            id: string;
            days: string;
            openTime: string | null;
            closeTime: string | null;
            isClosed: boolean;
            contactInfoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullAddress: string;
        country: string;
        phone: string;
    }>;
    updateContactInfo(id: string, data: any): Promise<({
        openingHours: {
            id: string;
            days: string;
            openTime: string | null;
            closeTime: string | null;
            isClosed: boolean;
            contactInfoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullAddress: string;
        country: string;
        phone: string;
    }) | null>;
    deleteContactInfo(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullAddress: string;
        country: string;
        phone: string;
    }>;
    createTestimonial(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        rating: number;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }>;
    getAllTestimonials(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        rating: number;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }[]>;
    getTestimonialById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        rating: number;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }>;
    updateTestimonial(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        rating: number;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }>;
    deleteTestimonial(id: string): Promise<{
        message: string;
    }>;
}
