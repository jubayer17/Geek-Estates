import { HomeService } from './home.service';
import { CreateLegacySectionDto, UpdateLegacySectionDto } from './homeDTO';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    createHeroBanner(file: Express.Multer.File, data: string): Promise<{
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
    updateHeroBanner(id: string, file?: Express.Multer.File, data?: string): Promise<{
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
    create(dto: CreateLegacySectionDto): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAll(): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateLegacySectionDto): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        title: string;
        isActive: boolean;
        journeyTag: string | null;
        emphasis: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    featuredImageCreate(files: {
        image?: Express.Multer.File[];
        icon?: Express.Multer.File[];
    }, data: string): Promise<{
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
    featuredImageUpdate(id: string, files: {
        image?: Express.Multer.File[];
        icon?: Express.Multer.File[];
    }, data: string): Promise<{
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
