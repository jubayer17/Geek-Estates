  import { Injectable } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateJobDto } from './dto/create-job.dto';
  import { UpdateJobDto } from './dto/update-job.dto';
  import { UpdateCareerPageDto } from './dto/update-career-page.dto';

  import { CreateValueDto } from './dto/create-value.dto';
  import { CreatePerkDto } from './dto/create-perk.dto';

  @Injectable()
  export class CareerService {
    constructor(private prisma: PrismaService) { }

    // ... (existing getCareerPage and updateCareerPage) ...

    async getCareerPage() {
      let page = await this.prisma.careerPage.findFirst();
      if (!page) {
        page = await this.prisma.careerPage.create({
          data: {
            heroTitle: 'Join Our Team',
            heroSubtitle: 'We’re always looking for talented people. Explore opportunities and grow your career with us!',
            heroImage: '/career.jpg',
            valuesBadge: 'Our Core Philosophy',
            valuesTitle: 'Driven by Purpose',
            valuesDescription: 'At Geek Estate, we don\'t just build properties; we build legacies.',
            perksBadge: 'Employee Benefits',
            perksTitle: 'Everything You Need To Thrive.',
            perksDescription: 'We believe that when you feel your best, you do your best work.',
            jobsBadge: 'Join The Team',
            jobsTitle: 'Current Positions',
            jobsDescription: 'Discover the role that will challenge you, inspire you, and let you make a real impact.'
          },
        });
      }
      return page;
    }

    async updateCareerPage(dto: UpdateCareerPageDto) {
      const page = await this.getCareerPage();
      return this.prisma.careerPage.update({
        where: { id: page.id },
        data: dto,
      });
    }

    // Values
    async getValues() {
      return this.prisma.careerValue.findMany({ orderBy: { createdAt: 'asc' } });
    }

    async createValue(dto: CreateValueDto) {
      return this.prisma.careerValue.create({ data: dto });
    }

    async deleteValue(id: string) {
      return this.prisma.careerValue.delete({ where: { id } });
    }

    // Perks
    async getPerks() {
      return this.prisma.careerPerk.findMany({ orderBy: { createdAt: 'asc' } });
    }

    async createPerk(dto: CreatePerkDto) {
      return this.prisma.careerPerk.create({ data: dto });
    }

    async deletePerk(id: string) {
      return this.prisma.careerPerk.delete({ where: { id } });
    }

    async createJob(dto: CreateJobDto) {
      return this.prisma.job.create({
        data: {
          ...dto,
          deadline: new Date(dto.deadline),
        },
      });
    }

    async findAllJobs() {
      return this.prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    async findOneJob(id: string) {
      return this.prisma.job.findUnique({
        where: { id },
      });
    }

    async updateJob(id: string, dto: UpdateJobDto) {
      const data: any = { ...dto };
      if (dto.deadline) {
        data.deadline = new Date(dto.deadline);
      }
      return this.prisma.job.update({
        where: { id },
        data,
      });
    }

    async removeJob(id: string) {
      return this.prisma.job.delete({
        where: { id },
      });
    }
  }
