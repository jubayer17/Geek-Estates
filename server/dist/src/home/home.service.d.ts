import { CreateHeroBannerDto } from './homeDTO';
export declare class HomeService {
    createHeroBanner(dto: CreateHeroBannerDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            imageUrl: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getHeroBanners(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            imageUrl: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getHeroBannerById(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            imageUrl: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
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
            badgeText: string | null;
            title: string | null;
            subtitle: string | null;
            imageUrl: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteHeroBanner(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
