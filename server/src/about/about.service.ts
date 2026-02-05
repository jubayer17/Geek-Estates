import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/helper/prisma';
import { CreateAboutUsTextDto, UpdateAboutUsTextDto } from './aboutUs.dto';
import { uploadToCloudinary } from 'src/helper/fileUploader';

@Injectable()
export class AboutService {
 
    
  //AboutUsText CREATE (only once)
// 🔥 RUNS AUTOMATICALLY WHEN SERVER STARTS
  async onModuleInit() {
    const exists = await prisma.aboutUsText.findFirst();

    if (!exists) {
      await prisma.aboutUsText.create({
        data: {
          page: 'Career',
          title: 'About Us',
          subtitle:
            'Redefining luxury living with a legacy of excellence, integrity, and innovation',
          isActive: true,
        },
      });

      console.log('✅ AboutUsText created automatically');
    } else {
      console.log('ℹ️ AboutUsText already exists');
    }
  }

  // GET endpoint
  async getAboutUsText() {
    return prisma.aboutUsText.findFirst({ where: { isActive: true } });
  }

  // PUT endpoint (update existing record)
  async updateAboutUsText(dto: {
    page?: string;
    title?: string;
    subtitle?: string;
    isActive?: boolean;
  }) {
    const existing = await prisma.aboutUsText.findFirst();

    if (!existing) {
      throw new NotFoundException('AboutUsText not found');
    }

    return prisma.aboutUsText.update({
      where: { id: existing.id },
      data: dto,
    });
  }

// =====================
  // CREATE / Upload Banner
  // =====================
   // CREATE / UPLOAD NEW IMAGE
  async aboutUsUploadImage(file: Express.Multer.File, text?: string, type?: string) {
    if (!file) throw new BadRequestException('File is required');

    const result = await uploadToCloudinary(file); // use file.path

    return prisma.aboutUsBanner.create({
      data: {
        url: result.secure_url,
        altText: text || null,
        type: type || null,
      },
    });
  }

  // READ / GET IMAGES
  async aboutUsGetImages(type?: string) {
    return prisma.aboutUsBanner.findMany({
      where: { isActive: true, type },
      orderBy: { createdAt: 'desc' },
    });
  }

  // UPDATE / IMAGE OR DATA
  async aboutUsUpdateImage(
    id: string,
    file?: Express.Multer.File,
    data?: { altText?: string; type?: string },
  ) {
    const existing = await prisma.aboutUsBanner.findUnique({ where: { id } });

    if (!existing || !existing.isActive) {
      throw new NotFoundException('Banner not found');
    }

    let newUrl: string | undefined;

    if (file) {
      const result = await uploadToCloudinary(file); // pass file.path
      newUrl = result.secure_url;
    }

    return prisma.aboutUsBanner.update({
      where: { id },
      data: {
        url: newUrl ?? existing.url,
        altText: data?.altText ?? existing.altText,
        type: data?.type ?? existing.type,
      },
    });
  }

  // DELETE / SOFT DELETE
  async aboutUsDeleteImage(id: string) {
    const existing = await prisma.aboutUsBanner.findUnique({ where: { id } });

    if (!existing || !existing.isActive) {
      throw new NotFoundException('Banner not found');
    }

    return prisma.aboutUsBanner.update({
      where: { id },
      data: { isActive: false },
    });
  }


  //aboutWhoWeAre Create
  async aboutWhoWeAreCreate(file: Express.Multer.File, data: any) {
    if (!file) throw new BadRequestException('Image file is required');

    const uploadResult = await uploadToCloudinary(file);

    return prisma.aboutWhoWeAre.create({
      data: {
        imageUrl: uploadResult.secure_url,
        yearsOfExcellence: data.yearsOfExcellence,
        excellenceText: data.excellenceText,
        smallHeading: data.smallHeading,
        mainHeading: data.mainHeading,
        mainHeadingItalic: data.mainHeadingItalic,
        paragraphs: data.paragraphs,
        ctaText: data.ctaText ?? null,
        ctaUrl: data.ctaUrl ?? null,
      },
    });
  }
//aboutWhoWeAre get
  async aboutWhoWeAreGet() {
    return prisma.aboutWhoWeAre.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }
//aboutWhoWeAre update
async aboutWhoWeAreUpdate(
    id: string,
    file?: Express.Multer.File,
    data?: any,
  ) {
    const existing = await prisma.aboutWhoWeAre.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Entry not found');
    }

    // Only upload a new image if file is provided
    let newImageUrl = existing.imageUrl;
    if (file) {
      const uploadResult = await uploadToCloudinary(file);
      newImageUrl = uploadResult.secure_url;
    }

    return prisma.aboutWhoWeAre.update({
      where: { id },
      data: {
        imageUrl: newImageUrl, // new if uploaded, old if not
        yearsOfExcellence: data?.yearsOfExcellence ?? existing.yearsOfExcellence,
        excellenceText: data?.excellenceText ?? existing.excellenceText,
        smallHeading: data?.smallHeading ?? existing.smallHeading,
        mainHeading: data?.mainHeading ?? existing.mainHeading,
        mainHeadingItalic: data?.mainHeadingItalic ?? existing.mainHeadingItalic,
        paragraphs: data?.paragraphs ?? existing.paragraphs,
        ctaText: data?.ctaText ?? existing.ctaText,
        ctaUrl: data?.ctaUrl ?? existing.ctaUrl,
      },
    });
  }

//aboutWhoWeAre delete
  async aboutWhoWeAreDelete(id: string) {
    const existing = await prisma.aboutWhoWeAre.findUnique({ where: { id } });
    if (!existing || !existing.isActive) throw new NotFoundException('Entry not found');

    return prisma.aboutWhoWeAre.update({
      where: { id },
      data: { isActive: false },
    });
  }

  //aboutUsAchievements CREATE
  async aboutUsAchievementsCreate(data: {
    number: string;
    title: string;
    description: string;
  }) {
    if (!data.number || !data.title || !data.description) {
      throw new BadRequestException('All fields (number, title, description) are required');
    }

    return prisma.aboutUsAchievements.create({
      data: {
        number: data.number,
        title: data.title,
        description: data.description,
      },
    });
  }

  //aboutUsAchievements  GET ALL (only active)
  async aboutUsAchievementsGet() {
    return prisma.aboutUsAchievements.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // aboutUsAchievements UPDATE
  async aboutUsAchievementsUpdate(
    id: string,
    data: Partial<{ number: string; title: string; description: string }>,
  ) {
    const existing = await prisma.aboutUsAchievements.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Achievement not found');
    }

    return prisma.aboutUsAchievements.update({
      where: { id },
      data: {
        number: data.number ?? existing.number,
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
      },
    });
  }

  // aboutUsAchievements DELETE (soft delete)
  async aboutUsAchievementsDelete(id: string) {
    const existing = await prisma.aboutUsAchievements.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Achievement not found');
    }

    return prisma.aboutUsAchievements.update({
      where: { id },
      data: { isActive: false },
    });
  }

  //aboutUsCoreValue CREATE
  async aboutUsCoreValueCreate(data: { title: string; description: string }) {
    if (!data.title || !data.description) {
      throw new BadRequestException('Title and description are required');
    }

    return prisma.aboutUsCoreValue.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  //aboutUsCoreValue GET ALL active records
  async aboutUsCoreValueGet() {
    return prisma.aboutUsCoreValue.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  //aboutUsCoreValue UPDATE by id
  async aboutUsCoreValueUpdate(id: string, data: Partial<{ title: string; description: string }>) {
    const existing = await prisma.aboutUsCoreValue.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Core Value not found');
    }

    return prisma.aboutUsCoreValue.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
      },
    });
  }

  // aboutUsCoreValue DELETE (soft delete)
  async aboutUsCoreValueDelete(id: string) {
    const existing = await prisma.aboutUsCoreValue.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Core Value not found');
    }

    return prisma.aboutUsCoreValue.update({
      where: { id },
      data: { isActive: false },
    });
  }

   //aboutUsAwardTextSection CREATE
 async aboutUsAwardTextSectionCreate(data: {
    title: string;
    extraTitle?: string;
    subtitle: string;
    upText?: string;
  }) {
    const existing = await prisma.aboutUsAwardTextSection.findFirst({ where: { isActive: true } });
    if (existing) {
      throw new BadRequestException('AboutUsTextSection already exists');
    }

    return prisma.aboutUsAwardTextSection.create({
      data: {
        title: data.title,
        extraTitle: data.extraTitle || null,
        subtitle: data.subtitle,
        upText: data.upText || null,
      },
    });
  }

  // aboutUsAwardTextSection GET — return the single entry
  async aboutUsAwardTextSectionGet() {
    const section = await prisma.aboutUsAwardTextSection.findFirst({ where: { isActive: true } });
    if (!section) {
      throw new NotFoundException('AboutUsTextSection not found');
    }
    return section;
  }

  //aboutUsAwardTextSection UPDATE — only one entry, partial updates allowed
  async aboutUsAwardTextSectionUpdate(data: Partial<{
    title: string;
    extraTitle?: string;
    subtitle?: string;
    upText?: string;
  }>) {
    const existing = await prisma.aboutUsAwardTextSection.findFirst({ where: { isActive: true } });
    if (!existing) {
      throw new NotFoundException('AboutUsTextSection not found');
    }

    return prisma.aboutUsAwardTextSection.update({
      where: { id: existing.id },
      data: {
        title: data.title ?? existing.title,
        extraTitle: data.extraTitle ?? existing.extraTitle,
        subtitle: data.subtitle ?? existing.subtitle,
        upText: data.upText ?? existing.upText,
      },
    });
  }

  // aboutUsAwardTextSection DELETE (soft delete)
  async aboutUsAwardTextSectionDelete() {
    const existing = await prisma.aboutUsAwardTextSection.findFirst({ where: { isActive: true } });
    if (!existing) {
      throw new NotFoundException('AboutUsTextSection not found');
    }

    return prisma.aboutUsAwardTextSection.delete({
      where: { id: existing.id },
    });
  }

   //aboutUsAwardRecord CREATE
  async aboutUsAwardRecordCreate(data: {
    year: string;
    title: string;
    subtitle: string;
  }) {
    if (!data.year || !data.title || !data.subtitle) {
      throw new BadRequestException('year, title, and subtitle are required');
    }

    return prisma.aboutUsAwardRecord.create({
      data: {
        year: data.year,
        title: data.title,
        subtitle: data.subtitle,
      },
    });
  }

  //aboutUsAwardRecord GET ALL active records
  async aboutUsAwardRecordGet() {
    return prisma.aboutUsAwardRecord.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  //aboutUsAwardRecord UPDATE by id (partial updates allowed)
  async aboutUsAwardRecordUpdate(
    id: string,
    data: Partial<{ year: string; title: string; subtitle: string }>,
  ) {
    const existing = await prisma.aboutUsAwardRecord.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Award record not found');
    }

    return prisma.aboutUsAwardRecord.update({
      where: { id },
      data: {
        year: data.year ?? existing.year,
        title: data.title ?? existing.title,
        subtitle: data.subtitle ?? existing.subtitle,
      },
    });
  }

  // aboutUsAwardRecord DELETE (soft delete)
  async aboutUsAwardRecordDelete(id: string) {
    const existing = await prisma.aboutUsAwardRecord.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Award record not found');
    }

    return prisma.aboutUsAwardRecord.update({
      where: { id },
      data: { isActive: false },
    });
  }

  //aboutUsJourneyTextSection CREATE — only one allowed
  async aboutUsJourneyTextSectionCreate(data: {
    title: string;
    subtitle: string;
    upText?: string;
  }) {
    const existing = await prisma.aboutUsJourneyTextSection.findFirst({ where: { isActive: true } });
    if (existing) {
      throw new BadRequestException('Journey text section already exists');
    }

    return prisma.aboutUsJourneyTextSection.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        upText: data.upText || null,
      },
    });
  }

  //aboutUsJourneyTextSection GET — return the single entry
  async aboutUsJourneyTextSectionGet() {
    const section = await prisma.aboutUsJourneyTextSection.findFirst({ where: { isActive: true } });
    if (!section) {
      throw new NotFoundException('Journey text section not found');
    }
    return section;
  }

  //aboutUsJourneyTextSection UPDATE — partial updates allowed
  async aboutUsJourneyTextSectionUpdate(data: Partial<{
    title: string;
    subtitle: string;
    upText?: string;
  }>) {
    const existing = await prisma.aboutUsJourneyTextSection.findFirst({ where: { isActive: true } });
    if (!existing) {
      throw new NotFoundException('Journey text section not found');
    }

    return prisma.aboutUsJourneyTextSection.update({
      where: { id: existing.id },
      data: {
        title: data.title ?? existing.title,
        subtitle: data.subtitle ?? existing.subtitle,
        upText: data.upText ?? existing.upText,
      },
    });
  }

  //aboutUsJourneyTextSection DELETE — delete the single entry completely
  async aboutUsJourneyTextSectionDelete() {
    const existing = await prisma.aboutUsJourneyTextSection.findFirst({ where: { isActive: true } });
    if (!existing) {
      throw new NotFoundException('Journey text section not found');
    }

    return prisma.aboutUsJourneyTextSection.delete({
      where: { id: existing.id },
    });
  }

  // aboutUsJourneyTimeline CREATE
  async aboutUsJourneyTimelineCreate(data: {
    startYear: string;
    endYear: string;
    title: string;
    description: string;
  }) {
    if (!data.startYear || !data.endYear || !data.title || !data.description) {
      throw new BadRequestException('All fields are required');
    }

    return prisma.aboutUsJourneyTimeline.create({
      data: {
        startYear: data.startYear,
        endYear: data.endYear,
        title: data.title,
        description: data.description,
      },
    });
  }

  //aboutUsJourneyTimeline GET ALL ACTIVE TIMELINES
  async aboutUsJourneyTimelineGet() {
    return prisma.aboutUsJourneyTimeline.findMany({
      where: { isActive: true },
      orderBy: { startYear: 'asc' },
    });
  }

  //aboutUsJourneyTimeline UPDATE
  async aboutUsJourneyTimelineUpdate(
    id: string,
    data: Partial<{
      startYear: string;
      endYear: string;
      title: string;
      description: string;
    }>,
  ) {
    const existing = await prisma.aboutUsJourneyTimeline.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Timeline not found');
    }

    return prisma.aboutUsJourneyTimeline.update({
      where: { id },
      data: {
        startYear: data.startYear ?? existing.startYear,
        endYear: data.endYear ?? existing.endYear,
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
      },
    });
  }

  //aboutUsJourneyTimeline DELETE (Soft delete)
  async aboutUsJourneyTimelineDelete(id: string) {
    const existing = await prisma.aboutUsJourneyTimeline.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Timeline not found');
    }

    return prisma.aboutUsJourneyTimeline.update({
      where: { id },
      data: { isActive: false },
    });
  }
  // =====================
  // CREATE
  // =====================
  async aboutUsLeadershipCreate(
    file: Express.Multer.File,
    data: { quote: string; name: string; designation: string },
  ) {
    if (!file) throw new BadRequestException('Image file is required');
    if (!data.quote || !data.name || !data.designation) {
      throw new BadRequestException('quote, name, and designation are required');
    }

    const result = await uploadToCloudinary(file);

    return prisma.aboutUsLeadership.create({
      data: {
        imageUrl: result.secure_url,
        quote: data.quote,
        name: data.name,
        designation: data.designation,
      },
    });
  }

  // =====================
  // GET ALL ACTIVE
  // =====================
  async aboutUsLeadershipGet() {
    return prisma.aboutUsLeadership.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  // =====================
  // UPDATE (client choice: image, text, or both)
  // =====================
  async aboutUsLeadershipUpdate(
    id: string,
    file?: Express.Multer.File,
    data?: Partial<{ quote: string; name: string; designation: string }>,
  ) {
    const existing = await prisma.aboutUsLeadership.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Leadership entry not found');
    }

    let newImageUrl: string | undefined = undefined;
    if (file) {
      const result = await uploadToCloudinary(file);
      newImageUrl = result.secure_url;
    }

    return prisma.aboutUsLeadership.update({
      where: { id },
      data: {
        imageUrl: newImageUrl ?? existing.imageUrl,
        quote: data?.quote ?? existing.quote,
        name: data?.name ?? existing.name,
        designation: data?.designation ?? existing.designation,
      },
    });
  }

  // =====================
  // DELETE (soft delete)
  // =====================
  async aboutUsLeadershipDelete(id: string) {
    const existing = await prisma.aboutUsLeadership.findUnique({ where: { id } });
    if (!existing || !existing.isActive) {
      throw new NotFoundException('Leadership entry not found');
    }

    return prisma.aboutUsLeadership.update({
      where: { id },
      data: { isActive: false },
    });
  }
  // =====================
  //aboutUsTestimonial CREATE
  // =====================
  async aboutUsTestimonialCreate(data: {
    message: string;
    company: string;
    rating: number;
    name: string;
    designation: string;
  }) {
    const { message, company, rating, name, designation } = data;

    if (!message || !company || !name || !designation) {
      throw new BadRequestException('All fields are required');
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    return prisma.aboutUsTestimonial.create({
      data: {
        message,
        company,
        rating,
        name,
        designation,
      },
    });
  }

  // =====================
  // aboutUsTestimonial GET (all active)
  // =====================
  async aboutUsTestimonialGet() {
    return prisma.aboutUsTestimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // =====================
  // aboutUsTestimonial UPDATE (partial)
  // =====================
  async aboutUsTestimonialUpdate(
    id: string,
    data: Partial<{
      message: string;
      company: string;
      rating: number;
      name: string;
      designation: string;
    }>,
  ) {
    const existing = await prisma.aboutUsTestimonial.findUnique({
      where: { id },
    });

    if (!existing || !existing.isActive) {
      throw new NotFoundException('Testimonial not found');
    }

    if (data.rating && (data.rating < 1 || data.rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    return prisma.aboutUsTestimonial.update({
      where: { id },
      data: {
        message: data.message ?? existing.message,
        company: data.company ?? existing.company,
        rating: data.rating ?? existing.rating,
        name: data.name ?? existing.name,
        designation: data.designation ?? existing.designation,
      },
    });
  }

  // =====================
  //aboutUsTestimonial DELETE (soft delete)
  // =====================
  async aboutUsTestimonialDelete(id: string) {
    const existing = await prisma.aboutUsTestimonial.findUnique({
      where: { id },
    });

    if (!existing || !existing.isActive) {
      throw new NotFoundException('Testimonial not found');
    }

    return prisma.aboutUsTestimonial.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // =====================
  //aboutUsBuildSection CREATE
  // =====================

  async aboutUsBuildSectionCreate(data: {
    heading: string;
    highlightedText?: string;
    description?: string;
  }) {
    const existing = await prisma.aboutUsBuildSection.findFirst({
      where: { isActive: true },
    });

    if (existing) {
      throw new BadRequestException('Build section already exists');
    }

    return prisma.aboutUsBuildSection.create({
      data: {
        heading: data.heading,
        highlightedText: data.highlightedText ?? null,
        description: data.description ?? null,
      },
    });
  }

  // =====================
  // aboutUsBuildSection GET (single entry)
  // =====================
  async aboutUsBuildSectionGet() {
    const section = await prisma.aboutUsBuildSection.findFirst({
      where: { isActive: true },
    });

    if (!section) {
      throw new NotFoundException('Build section not found');
    }

    return section;
  }

  // =====================
  // aboutUsBuildSection UPDATE (single entry)
  // =====================
  async aboutUsBuildSectionUpdate(
    data: Partial<{
      heading: string;
      highlightedText?: string;
      description?: string;
    }>,
  ) {
    const existing = await prisma.aboutUsBuildSection.findFirst({
      where: { isActive: true },
    });

    if (!existing) {
      throw new NotFoundException('Build section not found');
    }

    return prisma.aboutUsBuildSection.update({
      where: { id: existing.id },
      data: {
        heading: data.heading ?? existing.heading,
        highlightedText: data.highlightedText ?? existing.highlightedText,
        description: data.description ?? existing.description,
      },
    });
  }

  // =====================
  // aboutUsBuildSection DELETE (hard delete)
  // =====================
  async aboutUsBuildSectionDelete() {
    const existing = await prisma.aboutUsBuildSection.findFirst({
      where: { isActive: true },
    });

    if (!existing) {
      throw new NotFoundException('Build section not found');
    }

    return prisma.aboutUsBuildSection.delete({
      where: { id: existing.id },
    });
  }
}






  

