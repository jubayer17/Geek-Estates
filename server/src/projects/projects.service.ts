import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectsPageDto } from './dto/update-projects-page.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async getProjectsPage() {
    let page = await this.prisma.projectsPage.findFirst();
    if (!page) {
      page = await this.prisma.projectsPage.create({
        data: {},
      });
    }
    return page;
  }

  async updateProjectsPage(dto: UpdateProjectsPageDto) {
    const page = await this.prisma.projectsPage.findFirst();
    if (page) {
      return this.prisma.projectsPage.update({
        where: { id: page.id },
        data: dto,
      });
    } else {
      return this.prisma.projectsPage.create({
        data: {
          ...dto,
        },
      });
    }
  }

  async create(dto: CreateProjectDto, imageUrl: string) {
    const data = {
      ...dto,
      image: imageUrl,
      beds: dto.beds ? Number(dto.beds) : null,
      baths: dto.baths ? Number(dto.baths) : null,
      area: dto.area ? Number(dto.area) : null,
      featured: String(dto.featured) === 'true',
    };

    // Remove null values if they shouldn't be set or rely on Prisma's handling
    // Prisma allows null for optional fields

    return this.prisma.project.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateProjectDto, imageUrl?: string) {
    const data: any = { ...dto };
    if (imageUrl) {
      data.image = imageUrl;
    }
    if (dto.beds !== undefined) data.beds = Number(dto.beds);
    if (dto.baths !== undefined) data.baths = Number(dto.baths);
    if (dto.area !== undefined) data.area = Number(dto.area);
    if (dto.featured !== undefined) data.featured = String(dto.featured) === 'true';

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
