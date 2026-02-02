import { CreateFeaturedImageDto, CreateHeroBannerDto, CreateLegacySectionDto, UpdateFeaturedImageDto, UpdateLegacySectionDto } from './homeDTO';
export declare class HomeService {
    createHeroBanner(dto: CreateHeroBannerDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            isActive: boolean;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    getHeroBanners(): Promise<{
        success: boolean;
        message: string;
        data: {
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            isActive: boolean;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            buttonText1: string | null;
            buttonText2: string | null;
        }[];
    }>;
    getHeroBannerById(id: string): Promise<{
        success: boolean;
        data: {
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            isActive: boolean;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
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
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            isActive: boolean;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            buttonText1: string | null;
            buttonText2: string | null;
        };
    }>;
    deleteHeroBanner(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    textSectionCreate(dto: CreateLegacySectionDto): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    textSectionGetAll(): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    textSectionGetById(id: string): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    textSectionUpdate(id: string, dto: UpdateLegacySectionDto): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    textSectionRemove(id: string): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    featuredImageCreate(dto: CreateFeaturedImageDto, image?: Express.Multer.File, icon?: Express.Multer.File): Promise<{
        title: string;
        isActive: boolean;
        description: string;
        order: number;
        label: string;
        id: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        iconUrl: string | null;
    }>;
    featuredImageGetAll(): Promise<{
        title: string;
        isActive: boolean;
        description: string;
        order: number;
        label: string;
        id: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        iconUrl: string | null;
    }[]>;
    featuredImageGetById(id: string): Promise<{
        title: string;
        isActive: boolean;
        description: string;
        order: number;
        label: string;
        id: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        iconUrl: string | null;
    }>;
    featuredImageUpdate(id: string, dto: UpdateFeaturedImageDto, image?: Express.Multer.File, icon?: Express.Multer.File): Promise<{
        title: string;
        isActive: boolean;
        description: string;
        order: number;
        label: string;
        id: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        iconUrl: string | null;
    }>;
    featuredImageDelete(id: string): Promise<{
        title: string;
        isActive: boolean;
        description: string;
        order: number;
        label: string;
        id: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        iconUrl: string | null;
    }>;
}
