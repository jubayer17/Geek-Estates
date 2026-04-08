import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { uploadToCloudinary } from 'src/helper/fileUploader';
import { prisma } from 'src/helper/prisma';

@Injectable()
export class NewsAndBlogsService {
 
  //newsAndBlogs Create ONLY once
  async newsAndBlogscreate(data: {
    page: string;
    title: string;
    subtitle: string;
  }) {
    const existing = await prisma.newsAndBlogsText.findFirst();

    if (existing) {
      throw new BadRequestException(
        'News and Blogs text already exists',
      );
    }

    return prisma.newsAndBlogsText.create({
      data,
    });
  }

    // newsAndBlogs UPDATE existing record
  async newsAndBlogsupdate(
    id: string,
    data: {
      page?: string;
      title?: string;
      subtitle?: string;
      isActive?: boolean;
    },
  ) {
    const existing = await prisma.newsAndBlogsText.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Record not found');
    }

    return prisma.newsAndBlogsText.update({
      where: { id },
      data,
    });
  }

  //newsAndBlogs Get (single record)
  async newsAndBlogsFindOne() {
    return prisma.newsAndBlogsText.findFirst();
  }
  // newsAndBlogs Permanent delete
  async newsAndBlogsdelete(id: string) {
    return prisma.newsAndBlogsText.delete({
      where: { id },
    });
  }

  
  //news CREATE
  async newsCreate(data: any, file?: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (file) {
      const uploaded = await uploadToCloudinary(file);
      imageUrl = uploaded.secure_url;
    }

    return prisma.news.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        category: data.category,
        author: data.author,
        isPublished: data.isPublished ?? false,
        publishedAt: data.isPublished ? new Date() : null,
        coverImageUrl: imageUrl,
      },
    });
  }

  //news GET ALL
  async newsFindAll() {
    return prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // GET BY ID
  async newsFindById(id: string) {
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    return news;
  }

  // news UPDATE
  async newsUpdate(id: string, data: any, file?: Express.Multer.File) {
    const existing = await prisma.news.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('News not found');
    }

    let imageUrl = existing.coverImageUrl;

    if (file) {
      const uploaded = await uploadToCloudinary(file);
      imageUrl = uploaded.secure_url;
    }

    return prisma.news.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        subtitle: data.subtitle ?? existing.subtitle,
        content: data.content ?? existing.content,
        category: data.category ?? existing.category,
        author: data.author ?? existing.author,
        isPublished: data.isPublished ?? existing.isPublished,
        publishedAt:
          data.isPublished && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
        coverImageUrl: imageUrl,
      },
    });
  }

  //news DELETE (permanent)
  async newsDelete(id: string) {
    const existing = await prisma.news.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('News not found');
    }

    return prisma.news.delete({ where: { id } });
  }

   // Validate email format
  private isValidEmail(email: string): boolean {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // CREATE subscriber
  async subscriberCreate(data: { email: string; name?: string; source?: string }) {
    if (!this.isValidEmail(data.email)) {
      throw new BadRequestException('Invalid email address');
    }

    return prisma.subscriber.create({
      data,
    });
  }

  // GET all subscribers
  async subscriberFindAll() {
    return prisma.subscriber.findMany({
      orderBy: { joinedAt: 'desc' },
    });
  }

  // subscriber GET by ID
  async subscriberFindById(id: string) {
    const subscriber = await prisma.subscriber.findUnique({ where: { id } });
    if (!subscriber) throw new NotFoundException('Subscriber not found');
    return subscriber;
  }

  // subscriber GET by Email

   async subscriberFindByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // Trim spaces and convert to lowercase for safe matching
    const normalizedEmail = email.trim().toLowerCase();

    if (!this.isValidEmail(normalizedEmail)) {
      throw new BadRequestException('Invalid email address');
    }

    const subscriber = await prisma.subscriber.findFirst({
      where: { email: normalizedEmail },
    });

    if (!subscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    return subscriber;
  }

  //subscriber DELETE by ID
  async subscriberDelete(id: string) {
    const existing = await prisma.subscriber.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Subscriber not found');
    return prisma.subscriber.delete({ where: { id } });
  }

  //newsletterSection Create the section (only if it doesn't exist)
  async newsletterSectionCreate(data: { heading: string; subheading: string; section:string; description: string }) {
    const existing = await prisma.newsletterSection.findFirst();
    if (existing) {
      throw new Error('Newsletter section already exists. Use update instead.');
    }

    return prisma.newsletterSection.create({ data });
  }

  //newsletterSection Get the section (only one)
  async newsletterSectionGet() {
    const section = await prisma.newsletterSection.findFirst();
    if (!section) throw new NotFoundException('Newsletter section not found');
    return section;
  }

  //newsletterSection Update the section (only one)
  async newsletterSectionUpdate(data: { heading?: string; subheading?: string; description?: string }) {
    const section = await prisma.newsletterSection.findFirst();
    if (!section) throw new NotFoundException('Newsletter section not found');

    return prisma.newsletterSection.update({
      where: { id: section.id },
      data,
    });
  }

   // Create a new report
  async reportCreate(data: {
    category?: string;
    title: string;
    description: string;
    publishDate: Date | string;
    downloadUrl?: string;
  }) {
    // Basic validation
    if (!data.title || !data.description || !data.publishDate) {
      throw new BadRequestException('Title, description, and publishDate are required');
    }

    const publishDate = new Date(data.publishDate);
    if (isNaN(publishDate.getTime())) {
      throw new BadRequestException('Invalid publishDate format');
    }

    return prisma.sustainabilityReport.create({
      data: {
        category: data.category ?? 'SUSTAINABILITY',
        title: data.title,
        description: data.description,
        publishDate,
        downloadUrl: data.downloadUrl,
      },
    });
  }

  // Get all reports
  async reportGetAll() {
    return prisma.sustainabilityReport.findMany({
      orderBy: { publishDate: 'desc' },
    });
  }

  // Get a report by ID
  async reportGetById(id: string) {
    const report = await prisma.sustainabilityReport.findUnique({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Sustainability report with ID ${id} not found`);
    }
    return report;
  }

  // Update a report by ID
  async reportUpdate(id: string, data: Partial<{
    category: string;
    title: string;
    description: string;
    publishDate: Date | string;
    downloadUrl: string;
  }>) {
    const existingReport = await prisma.sustainabilityReport.findUnique({ where: { id } });
    if (!existingReport) {
      throw new NotFoundException(`Sustainability report with ID ${id} not found`);
    }

    let publishDate = existingReport.publishDate;
    if (data.publishDate) {
      publishDate = new Date(data.publishDate);
      if (isNaN(publishDate.getTime())) {
        throw new BadRequestException('Invalid publishDate format');
      }
    }

    return prisma.sustainabilityReport.update({
      where: { id },
      data: {
        category: data.category ?? existingReport.category,
        title: data.title ?? existingReport.title,
        description: data.description ?? existingReport.description,
        publishDate,
        downloadUrl: data.downloadUrl ?? existingReport.downloadUrl,
      },
    });
  }

  // Delete a report by ID
  async reportDelete(id: string) {
    const existingReport = await prisma.sustainabilityReport.findUnique({ where: { id } });
    if (!existingReport) {
      throw new NotFoundException(`Sustainability report with ID ${id} not found`);
    }
    return prisma.sustainabilityReport.delete({ where: { id } });
  }

}
