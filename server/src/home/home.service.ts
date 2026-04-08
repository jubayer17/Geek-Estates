import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {  CreateFeaturedImageDto, CreateHeroBannerDto, CreateLegacySectionDto, UpdateFeaturedImageDto, UpdateLegacySectionDto } from './homeDTO';
import { fileUploader, uploadToCloudinary } from 'src/helper/fileUploader';
import { Testimonial } from '@prisma/client';
import { prisma } from './../helper/prisma';

@Injectable()
export class HomeService {

  // create home banner service
  async createHeroBanner(
    dto: CreateHeroBannerDto,
    file?: Express.Multer.File,
  ) {
    let imageUrl: string | null = null;

    if (file) {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only image files allowed');
      }

      const uploadResult =
        await fileUploader.uploadToCloudinary(file);

      if (!uploadResult?.secure_url) {
        throw new BadRequestException('Cloudinary upload failed');
      }

      imageUrl = uploadResult.secure_url;
    }

    const heroBanner = await prisma.heroBanner.create({
      data: {
        badgeText: dto.badgeText,
        title: dto.title,
        subtitle: dto.subtitle,
        imageUrl,
        isActive: dto.isActive ?? true,
        buttonText1:dto.buttonText1,
        buttonText2:dto.buttonText2
      },
    });

    return {
      success: true,
      message: 'Hero banner created successfully',
      data: heroBanner,
    };
  }

  //Get Home Banner service 
  async getHeroBanners() {
    const heroBanners = await prisma.heroBanner.findMany({
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

    //get individual banner
    async getHeroBannerById(id: string) {
  const heroBanner = await prisma.heroBanner.findUnique({
    where: { id },
  });

  if (!heroBanner) {
    throw new NotFoundException('Hero banner not found');
  }

  return {
    success: true,
    data: heroBanner,
  };
}


  // update existing home banner
  async updateHeroBanner(
  id: string,
  dto: Partial<{
    badgeText: string;
    title: string;
    subtitle: string;
    isActive: boolean;
    buttonText1:string,
        buttonText2:string
  }> = {},
  file?: Express.Multer.File,
) {
  const existing = await prisma.heroBanner.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new NotFoundException('Hero banner not found');
  }

  let imageUrl = existing.imageUrl;

  // Upload new image ONLY if provided
  if (file) {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files allowed');
    }

    const uploadResult = await fileUploader.uploadToCloudinary(file);
    imageUrl = uploadResult.secure_url;
  }

  // Build update data dynamically (only include provided fields)
  const updateData: any = { imageUrl };

  if (dto.badgeText !== undefined) updateData.badgeText = dto.badgeText;
  if (dto.title !== undefined) updateData.title = dto.title;
  if (dto.subtitle !== undefined) updateData.subtitle = dto.subtitle;
  if (dto.isActive !== undefined) updateData.isActive = dto.isActive;
  if (dto.buttonText1 !== undefined) updateData.buttonText1 = dto.buttonText1;
  if (dto.buttonText2 !== undefined) updateData.buttonText2 = dto.buttonText2;

  const updatedBanner = await prisma.heroBanner.update({
    where: { id },
    data: updateData,
  });

  return {
    success: true,
    message: 'Hero banner updated successfully',
    data: updatedBanner,
  };
}

//delete hero banner 
async deleteHeroBanner(id: string) {
    const existing = await prisma.heroBanner.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Hero banner not found');
    }

    await prisma.heroBanner.delete({
      where: { id },
    });

    return {
      success: true,
      message: `Hero banner with id ${id} deleted successfully`,
    };
  }


  // legacy-section.service.ts


  async textSectionCreate(dto: CreateLegacySectionDto) {
    return prisma.textSection.create({ data: dto });
  }

  async textSectionGetAll() {
  const records = await prisma.textSection.findMany();

  if (records.length === 0) {
    throw new NotFoundException('No text sections found');
  }

  return records;
}



  async textSectionGetById(id: string) {
    const record = await prisma.textSection.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`text Section with id ${id} not found`);
    }
    return record;
  }

  async textSectionUpdate(id: string, dto: UpdateLegacySectionDto) {
    // Check existence
    await this.textSectionGetById(id);

    return prisma.textSection.update({
      where: { id },
      data: dto,
    });
  }

  async textSectionRemove(id: string) {
    // Check existence
    await this.textSectionGetById(id);

    return prisma.textSection.delete({ where: { id } });
  }


 //Create featured image
 
  async featuredImageCreate(
    dto: CreateFeaturedImageDto,
    image?: Express.Multer.File,
    icon?: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('Image is required');
    }

    const imageUpload = await fileUploader.uploadToCloudinary(image);
    if (!imageUpload?.secure_url) {
      throw new BadRequestException('Image upload failed');
    }

    let iconUrl: string | null = null;
    if (icon) {
      const iconUpload = await fileUploader.uploadToCloudinary(icon);
      if (!iconUpload?.secure_url) {
        throw new BadRequestException('Icon upload failed');
      }
      iconUrl = iconUpload.secure_url;
    }

    return prisma.featuredImage.create({
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
 //Get all featured image
  async featuredImageGetAll() {
    return prisma.featuredImage.findMany({
      orderBy: { order: 'asc' },
    });
  }
 //Get by id featured image
  async featuredImageGetById(id: string) {
    const record = await prisma.featuredImage.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException('Featured image not found');
    }

    return record;
  }
 // Update featured image
  async featuredImageUpdate(
    id: string,
    dto: UpdateFeaturedImageDto,
    image?: Express.Multer.File,
    icon?: Express.Multer.File,
  ) {
    await this.featuredImageGetById(id);

    let imageUrl: string | undefined;
    let iconUrl: string | undefined;

    if (image) {
      const upload = await fileUploader.uploadToCloudinary(image);
      imageUrl = upload?.secure_url;
    }

    if (icon) {
      const upload = await fileUploader.uploadToCloudinary(icon);
      iconUrl = upload?.secure_url;
    }

    return prisma.featuredImage.update({
      where: { id },
      data: {
        ...dto,
        ...(imageUrl && { imageUrl }),
        ...(iconUrl && { iconUrl }),
      },
    });
  }
  // Delete featured image
  async featuredImageDelete(id: string) {
    await this.featuredImageGetById(id);
    return prisma.featuredImage.delete({ where: { id } });
  }


   async getCompanyExperience() {
    return prisma.companyExperienceText.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  //  Get company experience by ID
  async getCompanyExperienceById(id: string) {
    const experience =
      await prisma.companyExperienceText.findUnique({
        where: { id },
      });

    if (!experience) {
      throw new NotFoundException('Company experience not found');
    }

    return experience;
  }

  //  Create company experience
  async createCompanyExperience(
    data
  ) {
    return prisma.companyExperienceText.create({
      data,
    });
  }

  //  Update company experience
  async updateCompanyExperience(
    id: string,
    data
  ) {
    await this.getCompanyExperienceById(id);

    return prisma.companyExperienceText.update({
      where: { id },
      data,
    });
  }

  //  Delete company experience
  async deleteCompanyExperience(id: string) {
    await this.getCompanyExperienceById(id);

    return prisma.companyExperienceText.delete({
      where: { id },
    });
  }

    // ✅ CREATE
  async property_search_stepCreate(
    data: any,
    files?: {
      image?: Express.Multer.File[];
      icons?: Express.Multer.File[];
    },
  ) {
    if (!files?.image?.[0]) {
      throw new BadRequestException('Image is required');
    }

    const imageUpload = await uploadToCloudinary(files.image[0]);

    let iconUrl: string | null = null;
    if (files?.icons?.[0]) {
      const iconUpload = await uploadToCloudinary(files.icons[0]);
      iconUrl = iconUpload.secure_url;
    }

    return prisma.propertySearchStep.create({
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

  // ✅ GET ALL
  async property_search_stepsGetAll() {
    return prisma.propertySearchStep.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  // ✅ GET BY ID
  async property_search_stepGetByID(id: string) {
    const step = await prisma.propertySearchStep.findUnique({
      where: { id },
    });

    if (!step) {
      throw new NotFoundException('Property search step not found');
    }

    return step;
  }

  // ✅ UPDATE (true PATCH)
  async property_search_stepUpdate(
    id: string,
    data: any = {},
    files?: {
      image?: Express.Multer.File[];
      icons?: Express.Multer.File[];
    },
  ) {
    const existing = await this.property_search_stepGetByID(id);

    let imageUrl = existing.imageUrl;
    let statusIcon = existing.statusIcon;

    if (files?.image?.[0]) {
      const upload = await uploadToCloudinary(files.image[0]);
      imageUrl = upload.secure_url;
    }

    if (files?.icons?.[0]) {
      const upload = await uploadToCloudinary(files.icons[0]);
      statusIcon = upload.secure_url;
    }

    return prisma.propertySearchStep.update({
      where: { id },
      data: {
        stepNumber:
          data.stepNumber !== undefined
            ? Number(data.stepNumber)
            : undefined,
        title: data.title,
        description: data.description,
        order:
          data.order !== undefined
            ? Number(data.order)
            : undefined,
        statusText: data.statusText,
        imageUrl,
        statusIcon,
        isActive:
          data.isActive !== undefined
            ? data.isActive === true || data.isActive === 'true'
            : undefined,
      },
    });
  }

  // ✅ DELETE
  async property_search_stepDelete(id: string) {
    await this.property_search_stepGetByID(id);

    return prisma.propertySearchStep.delete({
      where: { id },
    });
  }

  // Get ContactInfo

   async getContactInfo() {
    const info = await prisma.contactInfo.findFirst({
      include: {
        openingHours: true,
      },
    });
    if (!info) throw new NotFoundException('Contact info not found');
    return info;
  }

  // create ContactInfo

  async createContactInfo(data: any) {
    const { openingHours, ...contactData } = data;

    return prisma.contactInfo.create({
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

  // update ContactInfo
  async updateContactInfo(id: string, data: any) {
    const existing = await prisma.contactInfo.findUnique({
      where: { id },
      include: { openingHours: true },
    });
    if (!existing) throw new NotFoundException('Contact info not found');

    const { openingHours, ...contactData } = data;

    // Update main ContactInfo fields
    await prisma.contactInfo.update({
      where: { id },
      data: {
        ...contactData,
      },
    });

    if (openingHours && Array.isArray(openingHours)) {
      await prisma.openingHourGroup.deleteMany({
        where: { contactInfoId: id },
      });

      await prisma.openingHourGroup.createMany({
        data: openingHours.map((oh) => ({
          contactInfoId: id,
          days: oh.days,
          openTime: oh.openTime,
          closeTime: oh.closeTime,
          isClosed: oh.isClosed ?? false,
        })),
      });
    }

    return prisma.contactInfo.findUnique({
      where: { id },
      include: { openingHours: true },
    });
  }
// delete ContactInfo
  async deleteContactInfo(id: string) {
    await prisma.openingHourGroup.deleteMany({
      where: { contactInfoId: id },
    });

    return prisma.contactInfo.delete({
      where: { id },
    });
  }

// =========================
  // CREATE a testimonial
  // =========================
  async createTestimonial(data: any) {
    const {
      content,
      authorName,
      authorInitial,
      authorTitle,
      authorLocation,
      rating,
      propertyCategory,
      propertyTitle,
      propertyPurchaseValue,
      propertyPurchaseValueDisplay
    } = data;

    if (!content || !authorName || !rating || !propertyTitle) {
      throw new BadRequestException('Required fields missing');
    }

    const testimonial = await prisma.testimonial.create({
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

  // =========================
  // GET all testimonials
  // =========================
  async getAllTestimonials() {
    return prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // =========================
  // GET testimonial by ID
  // =========================
  async getTestimonialById(id: string) {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) throw new NotFoundException('Testimonial not found');
    return testimonial;
  }

  // =========================
  // UPDATE testimonial by ID
  // =========================
  async updateTestimonial(id: string, data: any) {
    await this.getTestimonialById(id);
    return prisma.testimonial.update({
      where: { id },
      data,
    });
  }

  // =========================
  // DELETE testimonial by ID
  // =========================
  async deleteTestimonial(id: string) {
    await this.getTestimonialById(id);
    await prisma.testimonial.delete({ where: { id } });
    return { message: 'Testimonial deleted successfully' };
  }

}








