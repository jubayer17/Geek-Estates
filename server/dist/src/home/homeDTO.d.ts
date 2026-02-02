export declare class CreateHeroBannerDto {
    badgeText?: string;
    title?: string;
    subtitle?: string;
    button1Text?: string;
    button2Text?: string;
    isActive?: boolean;
}
export declare class CreateLegacySectionDto {
    journeyTag?: string;
    title: string;
    emphasis?: string;
    description?: string;
}
export declare class UpdateLegacySectionDto {
    journeyTag?: string;
    title?: string;
    emphasis?: string;
    description?: string;
}
export declare class CreateFeaturedImageDto {
    order: number;
    label: string;
    title: string;
    description: string;
}
export declare class UpdateFeaturedImageDto {
    order?: number;
    label?: string;
    title?: string;
    description?: string;
}
