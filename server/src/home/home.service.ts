import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {  CreateFeaturedImageDto, CreateHeroBannerDto, CreateLegacySectionDto, UpdateFeaturedImageDto, UpdateLegacySectionDto } from './homeDTO';
import { fileUploader } from 'src/helper/fileUploader';
import { prisma } from 'src/helper/prisma';

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
}








