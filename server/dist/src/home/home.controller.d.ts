import { HomeService } from './home.service';
import { CreateLegacySectionDto, UpdateLegacySectionDto } from './homeDTO';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    createHeroBanner(file: Express.Multer.File, data: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            badgeText: string | null;
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
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            badgeText: string | null;
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
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            badgeText: string | null;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    updateHeroBanner(id: string, file?: Express.Multer.File, data?: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            subtitle: string | null;
            isActive: boolean;
            imageUrl: string | null;
            badgeText: string | null;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    deleteHeroBanner(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(dto: CreateLegacySectionDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    getAll(): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    update(id: string, dto: UpdateLegacySectionDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
    }>;
    featuredImageCreate(files: {
        image?: Express.Multer.File[];
        icon?: Express.Multer.File[];
    }, data: string): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
        label: string;
        iconUrl: string | null;
    }>;
    featuredImageGetAll(): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
        label: string;
        iconUrl: string | null;
    }[]>;
    featuredImageGetById(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
        label: string;
        iconUrl: string | null;
    }>;
    featuredImageUpdate(id: string, files: {
        image?: Express.Multer.File[];
        icon?: Express.Multer.File[];
    }, data: string): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
        label: string;
        iconUrl: string | null;
    }>;
    featuredImageDelete(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
        label: string;
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
    getCompanyExperienceByID(id: string): Promise<{
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
    createCompanyExperience(body: any): Promise<{
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
    updateCompanyExperience(id: string, body: any): Promise<{
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
    private parseData;
    property_search_stepCreate(data: string, files?: {
        image?: Express.Multer.File[];
        icons?: Express.Multer.File[];
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
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
        imageUrl: string;
        order: number;
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
        imageUrl: string;
        order: number;
        stepNumber: number;
        statusText: string | null;
        statusIcon: string | null;
    }>;
    property_search_stepUpdate(id: string, data?: string, files?: {
        image?: Express.Multer.File[];
        icons?: Express.Multer.File[];
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        imageUrl: string;
        order: number;
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
        imageUrl: string;
        order: number;
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
        fullAddress: string;
        country: string;
        phone: string;
        email: string;
    }>;
    postContactInfo(body: any): Promise<{
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
        fullAddress: string;
        country: string;
        phone: string;
        email: string;
    }>;
    updateContactInfo(id: string, body: any): Promise<({
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
        fullAddress: string;
        country: string;
        phone: string;
        email: string;
    }) | null>;
    deleteContactInfo(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullAddress: string;
        country: string;
        phone: string;
        email: string;
    }>;
    createTestimonial(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }>;
    getAllTestimonials(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }[]>;
    getTestimonialById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }>;
    updateTestimonial(id: string, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        content: string;
        authorName: string;
        authorInitial: string | null;
        authorTitle: string;
        authorLocation: string;
        propertyCategory: string;
        propertyTitle: string;
        propertyPurchaseValue: number;
        propertyPurchaseValueDisplay: string;
    }>;
    deleteTestimonial(id: string): Promise<{
        message: string;
    }>;
}
