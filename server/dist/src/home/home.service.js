"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const fileUploader_1 = require("../helper/fileUploader");
const prisma_1 = require("./../helper/prisma");
let HomeService = class HomeService {
    async createHeroBanner(dto, file) {
        let imageUrl = null;
        if (file) {
            if (!file.mimetype.startsWith('image/')) {
                throw new common_1.BadRequestException('Only image files allowed');
            }
            const uploadResult = await fileUploader_1.fileUploader.uploadToCloudinary(file);
            if (!uploadResult?.secure_url) {
                throw new common_1.BadRequestException('Cloudinary upload failed');
            }
            imageUrl = uploadResult.secure_url;
        }
        const heroBanner = await prisma_1.prisma.heroBanner.create({
            data: {
                badgeText: dto.badgeText,
                title: dto.title,
                subtitle: dto.subtitle,
                imageUrl,
                isActive: dto.isActive ?? true,
            },
        });
        return {
            success: true,
            message: 'Hero banner created successfully',
            data: heroBanner,
        };
    }
    async getHeroBanners() {
        const heroBanners = await prisma_1.prisma.heroBanner.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return {
            success: true,
            message: 'Hero banners fetched successfully',
            data: heroBanners,
        };
    }
    async getHeroBannerById(id) {
        const heroBanner = await prisma_1.prisma.heroBanner.findUnique({
            where: { id },
        });
        if (!heroBanner) {
            throw new common_1.NotFoundException('Hero banner not found');
        }
        return {
            success: true,
            data: heroBanner,
        };
    }
    async updateHeroBanner(id, dto = {}, file) {
        const existing = await prisma_1.prisma.heroBanner.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Hero banner not found');
        }
        let imageUrl = existing.imageUrl;
        if (file) {
            if (!file.mimetype.startsWith('image/')) {
                throw new common_1.BadRequestException('Only image files allowed');
            }
            const uploadResult = await fileUploader_1.fileUploader.uploadToCloudinary(file);
            imageUrl = uploadResult.secure_url;
        }
        const updateData = { imageUrl };
        if (dto.badgeText !== undefined)
            updateData.badgeText = dto.badgeText;
        if (dto.title !== undefined)
            updateData.title = dto.title;
        if (dto.subtitle !== undefined)
            updateData.subtitle = dto.subtitle;
        if (dto.isActive !== undefined)
            updateData.isActive = dto.isActive;
        const updatedBanner = await prisma_1.prisma.heroBanner.update({
            where: { id },
            data: updateData,
        });
        return {
            success: true,
            message: 'Hero banner updated successfully',
            data: updatedBanner,
        };
    }
    async deleteHeroBanner(id) {
        const existing = await prisma_1.prisma.heroBanner.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Hero banner not found');
        }
        await prisma_1.prisma.heroBanner.delete({
            where: { id },
        });
        return {
            success: true,
            message: `Hero banner with id ${id} deleted successfully`,
        };
    }
    async textSectionCreate(dto) {
        return prisma_1.prisma.textSection.create({ data: dto });
    }
    async textSectionGetAll() {
        const records = await prisma_1.prisma.textSection.findMany();
        if (records.length === 0) {
            throw new common_1.NotFoundException('No text sections found');
        }
        return records;
    }
    async textSectionGetById(id) {
        const record = await prisma_1.prisma.textSection.findUnique({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException(`text Section with id ${id} not found`);
        }
        return record;
    }
    async textSectionUpdate(id, dto) {
        await this.textSectionGetById(id);
        return prisma_1.prisma.textSection.update({
            where: { id },
            data: dto,
        });
    }
    async textSectionRemove(id) {
        await this.textSectionGetById(id);
        return prisma_1.prisma.textSection.delete({ where: { id } });
    }
    async featuredImageCreate(dto, image, icon) {
        if (!image) {
            throw new common_1.BadRequestException('Image is required');
        }
        const imageUpload = await fileUploader_1.fileUploader.uploadToCloudinary(image);
        if (!imageUpload?.secure_url) {
            throw new common_1.BadRequestException('Image upload failed');
        }
        let iconUrl = null;
        if (icon) {
            const iconUpload = await fileUploader_1.fileUploader.uploadToCloudinary(icon);
            if (!iconUpload?.secure_url) {
                throw new common_1.BadRequestException('Icon upload failed');
            }
            iconUrl = iconUpload.secure_url;
        }
        return prisma_1.prisma.featuredImage.create({
            data: {
                order: dto.order,
                label: dto.label,
                title: dto.title,
                description: dto.description,
                imageUrl: imageUpload.secure_url,
                iconUrl,
            },
        });
    }
    async featuredImageGetAll() {
        return prisma_1.prisma.featuredImage.findMany({
            orderBy: { order: 'asc' },
        });
    }
    async featuredImageGetById(id) {
        const record = await prisma_1.prisma.featuredImage.findUnique({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException('Featured image not found');
        }
        return record;
    }
    async featuredImageUpdate(id, dto, image, icon) {
        await this.featuredImageGetById(id);
        let imageUrl;
        let iconUrl;
        if (image) {
            const upload = await fileUploader_1.fileUploader.uploadToCloudinary(image);
            imageUrl = upload?.secure_url;
        }
        if (icon) {
            const upload = await fileUploader_1.fileUploader.uploadToCloudinary(icon);
            iconUrl = upload?.secure_url;
        }
        return prisma_1.prisma.featuredImage.update({
            where: { id },
            data: {
                ...dto,
                ...(imageUrl && { imageUrl }),
                ...(iconUrl && { iconUrl }),
            },
        });
    }
    async featuredImageDelete(id) {
        await this.featuredImageGetById(id);
        return prisma_1.prisma.featuredImage.delete({ where: { id } });
    }
    async getCompanyExperience() {
        return prisma_1.prisma.companyExperienceText.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: 'asc',
            },
        });
    }
    async getCompanyExperienceById(id) {
        const experience = await prisma_1.prisma.companyExperienceText.findUnique({
            where: { id },
        });
        if (!experience) {
            throw new common_1.NotFoundException('Company experience not found');
        }
        return experience;
    }
    async createCompanyExperience(data) {
        return prisma_1.prisma.companyExperienceText.create({
            data,
        });
    }
    async updateCompanyExperience(id, data) {
        await this.getCompanyExperienceById(id);
        return prisma_1.prisma.companyExperienceText.update({
            where: { id },
            data,
        });
    }
    async deleteCompanyExperience(id) {
        await this.getCompanyExperienceById(id);
        return prisma_1.prisma.companyExperienceText.delete({
            where: { id },
        });
    }
    async property_search_stepCreate(data, files) {
        if (!files?.image?.[0]) {
            throw new common_1.BadRequestException('Image is required');
        }
        const imageUpload = await (0, fileUploader_1.uploadToCloudinary)(files.image[0]);
        let iconUrl = null;
        if (files?.icons?.[0]) {
            const iconUpload = await (0, fileUploader_1.uploadToCloudinary)(files.icons[0]);
            iconUrl = iconUpload.secure_url;
        }
        return prisma_1.prisma.propertySearchStep.create({
            data: {
                stepNumber: Number(data.stepNumber),
                title: data.title,
                description: data.description,
                imageUrl: imageUpload.secure_url,
                statusText: data.statusText,
                statusIcon: iconUrl,
                order: Number(data.order),
                isActive: data.isActive ?? true,
            },
        });
    }
    async property_search_stepsGetAll() {
        return prisma_1.prisma.propertySearchStep.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
    }
    async property_search_stepGetByID(id) {
        const step = await prisma_1.prisma.propertySearchStep.findUnique({
            where: { id },
        });
        if (!step) {
            throw new common_1.NotFoundException('Property search step not found');
        }
        return step;
    }
    async property_search_stepUpdate(id, data = {}, files) {
        const existing = await this.property_search_stepGetByID(id);
        let imageUrl = existing.imageUrl;
        let statusIcon = existing.statusIcon;
        if (files?.image?.[0]) {
            const upload = await (0, fileUploader_1.uploadToCloudinary)(files.image[0]);
            imageUrl = upload.secure_url;
        }
        if (files?.icons?.[0]) {
            const upload = await (0, fileUploader_1.uploadToCloudinary)(files.icons[0]);
            statusIcon = upload.secure_url;
        }
        return prisma_1.prisma.propertySearchStep.update({
            where: { id },
            data: {
                stepNumber: data.stepNumber !== undefined
                    ? Number(data.stepNumber)
                    : undefined,
                title: data.title,
                description: data.description,
                order: data.order !== undefined
                    ? Number(data.order)
                    : undefined,
                statusText: data.statusText,
                imageUrl,
                statusIcon,
                isActive: data.isActive !== undefined
                    ? data.isActive === true || data.isActive === 'true'
                    : undefined,
            },
        });
    }
    async property_search_stepDelete(id) {
        await this.property_search_stepGetByID(id);
        return prisma_1.prisma.propertySearchStep.delete({
            where: { id },
        });
    }
    async getContactInfo() {
        const info = await prisma_1.prisma.contactInfo.findFirst({
            include: {
                openingHours: true,
            },
        });
        if (!info)
            throw new common_1.NotFoundException('Contact info not found');
        return info;
    }
    async createContactInfo(data) {
        const { openingHours, ...contactData } = data;
        return prisma_1.prisma.contactInfo.create({
            data: {
                ...contactData,
                openingHours: {
                    create: openingHours,
                },
            },
            include: {
                openingHours: true,
            },
        });
    }
    async updateContactInfo(id, data) {
        const existing = await prisma_1.prisma.contactInfo.findUnique({
            where: { id },
            include: { openingHours: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Contact info not found');
        const { openingHours, ...contactData } = data;
        await prisma_1.prisma.contactInfo.update({
            where: { id },
            data: {
                ...contactData,
            },
        });
        if (openingHours && Array.isArray(openingHours)) {
            await prisma_1.prisma.openingHourGroup.deleteMany({
                where: { contactInfoId: id },
            });
            await prisma_1.prisma.openingHourGroup.createMany({
                data: openingHours.map((oh) => ({
                    contactInfoId: id,
                    days: oh.days,
                    openTime: oh.openTime,
                    closeTime: oh.closeTime,
                    isClosed: oh.isClosed ?? false,
                })),
            });
        }
        return prisma_1.prisma.contactInfo.findUnique({
            where: { id },
            include: { openingHours: true },
        });
    }
    async deleteContactInfo(id) {
        await prisma_1.prisma.openingHourGroup.deleteMany({
            where: { contactInfoId: id },
        });
        return prisma_1.prisma.contactInfo.delete({
            where: { id },
        });
    }
    async createTestimonial(data) {
        const { content, authorName, authorInitial, authorTitle, authorLocation, rating, propertyCategory, propertyTitle, propertyPurchaseValue, propertyPurchaseValueDisplay } = data;
        if (!content || !authorName || !rating || !propertyTitle) {
            throw new common_1.BadRequestException('Required fields missing');
        }
        const testimonial = await prisma_1.prisma.testimonial.create({
            data: {
                content,
                authorName,
                authorInitial,
                authorTitle,
                authorLocation,
                rating,
                propertyCategory,
                propertyTitle,
                propertyPurchaseValue,
                propertyPurchaseValueDisplay: propertyPurchaseValueDisplay ?? `$${propertyPurchaseValue}M`
            }
        });
        return testimonial;
    }
    async getAllTestimonials() {
        return prisma_1.prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTestimonialById(id) {
        const testimonial = await prisma_1.prisma.testimonial.findUnique({ where: { id } });
        if (!testimonial)
            throw new common_1.NotFoundException('Testimonial not found');
        return testimonial;
    }
    async updateTestimonial(id, data) {
        await this.getTestimonialById(id);
        return prisma_1.prisma.testimonial.update({
            where: { id },
            data,
        });
    }
    async deleteTestimonial(id) {
        await this.getTestimonialById(id);
        await prisma_1.prisma.testimonial.delete({ where: { id } });
        return { message: 'Testimonial deleted successfully' };
    }
};
exports.HomeService = HomeService;
exports.HomeService = HomeService = __decorate([
    (0, common_1.Injectable)()
], HomeService);
//# sourceMappingURL=home.service.js.map