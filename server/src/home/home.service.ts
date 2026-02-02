import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroBannerDto } from './homeDTO';
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

}
