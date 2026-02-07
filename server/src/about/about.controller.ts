import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutUsTextDto, UpdateAboutUsTextDto } from './aboutUs.dto';
import { fileUploader } from 'src/helper/fileUploader';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

   @Get("/about-us-text")
  getAboutUsText() {
    return this.aboutService.getAboutUsText();
  }

  // UPDATE the AboutUsText
  @Put("/about-us-text")
  updateAboutUsText(
    @Body()
    dto: {
      page?: string;
      title?: string;
      subtitle?: string;
      isActive?: boolean;
    },
  ) {
    return this.aboutService.updateAboutUsText(dto);
  }


   // CREATE / UPLOAD
  @Post('/about-us-banner-image')
  @UseInterceptors(FileInterceptor('image', { storage: fileUploader.storage }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('text') text: string,
    @Body('type') type: string,
  ) {
    const banner = await this.aboutService.aboutUsUploadImage(file, text, type);
    return { message: 'Image uploaded successfully', banner };
  }

  // READ / GET IMAGES
  @Get("/about-us-banner-image")
  async getImages(@Query('type') type?: string) {
    const images = await this.aboutService.aboutUsGetImages(type);
    return images;
  }

  // UPDATE / CAN UPDATE IMAGE, ALT TEXT OR TYPE
  @Put('/about-us-banner-image/:id')
  @UseInterceptors(FileInterceptor('image', { storage: fileUploader.storage }))
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: { altText?: string; type?: string },
  ) {
    const banner = await this.aboutService.aboutUsUpdateImage(id, file, body);
    return { message: 'Image updated successfully', banner };
  }

  // DELETE / SOFT DELETE
  @Delete('/about-us-banner-image/:id')
  async deleteImage(@Param('id') id: string) {
    await this.aboutService.aboutUsDeleteImage(id);
    return { message: 'Image deleted successfully' };
  }

   // CREATE
  @Post("/aboutWhoWeAre")
  @UseInterceptors(FileInterceptor('image', { storage: fileUploader.storage }))
  async aboutWhoWeAreCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') dataString: string,
  ) {
    if (!file) throw new BadRequestException('Image file is required');
    if (!dataString) throw new BadRequestException('Data is required');

    let data;
    try {
      data = JSON.parse(dataString);
    } catch {
      throw new BadRequestException('Data must be valid JSON');
    }

    const result = await this.aboutService.aboutWhoWeAreCreate(file, data);
    return { message: 'Created successfully', data: result };
  }

  // GET all
  @Get("/aboutWhoWeAre")
  async aboutWhoWeAreGetAll() {
    return this.aboutService.aboutWhoWeAreGet();
  }

  // UPDATE
  @Put('/aboutWhoWeAre/:id')
   @UseInterceptors(FileInterceptor('image', { storage: fileUploader.storage }))
  async aboutWhoWeAreUpdate(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
    @Body('data') dataString?: string,
  ) {
    let data = {};
    if (dataString) {
      try {
        data = JSON.parse(dataString);
      } catch {
        throw new BadRequestException('Data must be valid JSON');
      }
    }

    const updated = await this.aboutService.aboutWhoWeAreUpdate(id, file, data);

    return { message: 'Updated successfully', data: updated };
  }



  // DELETE
  @Delete('/aboutWhoWeAre/:id')
  async aboutWhoWeAreDelete(@Param('id') id: string) {
    await this.aboutService.aboutWhoWeAreDelete(id);
    return { message: 'Deleted successfully' };
  }

  //aboutUsAchievements CREATE
  @Post("/aboutUsAchievements")
  async aboutUsAchievementsCreate(@Body() body: { number: string; title: string; description: string }) {
    if (!body.number || !body.title || !body.description) {
      throw new BadRequestException('number, title and description are required');
    }
    const achievement = await this.aboutService.aboutUsAchievementsCreate(body);
    return { message: 'Created successfully', achievement };
  }

  // aboutUsAchievements GET ALL
  @Get("/aboutUsAchievements")
  async aboutUsAchievementsGetAll() {
    const achievements = await this.aboutService.aboutUsAchievementsGet();
    return achievements;
  }

  // aboutUsAchievements UPDATE
  @Put('/aboutUsAchievements/:id')
  async aboutUsAchievementsUpdate(
    @Param('id') id: string,
    @Body() body: Partial<{ number: string; title: string; description: string }>,
  ) {
    const updated = await this.aboutService.aboutUsAchievementsUpdate(id, body);
    return { message: 'Updated successfully', updated };
  }

  // aboutUsAchievements DELETE (soft)
  @Delete('/aboutUsAchievements/:id')
  async aboutUsAchievementsDelete(@Param('id') id: string) {
    await this.aboutService.aboutUsAchievementsDelete(id);
    return { message: 'Deleted successfully' };
  }

  //aboutUsCoreValue CREATE
  @Post("/aboutUsCoreValue")
  async aboutUsCoreValueCreate(@Body() body: { title: string; description: string }) {
    if (!body.title || !body.description) {
      throw new BadRequestException('title and description are required');
    }
    const coreValue = await this.aboutService.aboutUsCoreValueCreate(body);
    return { message: 'Created successfully', coreValue };
  }

  // GET ALL
  @Get("/aboutUsCoreValue")
  async aboutUsCoreValueGetAll() {
    const coreValues = await this.aboutService.aboutUsCoreValueGet();
    return coreValues;
  }

  // UPDATE
  @Put('/aboutUsCoreValue/:id')
  async aboutUsCoreValueUpdate(
    @Param('id') id: string,
    @Body() body: Partial<{ title: string; description: string }>,
  ) {
    const updated = await this.aboutService.aboutUsCoreValueUpdate(id, body);
    return { message: 'Updated successfully', updated };
  }

  // DELETE
  @Delete('/aboutUsCoreValue/:id')
  async aboutUsCoreValueDelete(@Param('id') id: string) {
    await this.aboutService.aboutUsCoreValueDelete(id);
    return { message: 'Deleted successfully' };
  }


  //aboutUsAwardTextSection GET ALL
 @Post("/aboutUsAwardTextSection")
  async aboutUsAwardTextSectionCreate(@Body() body: { title: string; extraTitle?: string; subtitle: string; upText?: string }) {
    if (!body.title || !body.subtitle) {
      throw new BadRequestException('title and subtitle are required');
    }
    const section = await this.aboutService.aboutUsAwardTextSectionCreate(body);
    return { message: 'Created successfully', section };
  }

  // GET single entry
  @Get("/aboutUsAwardTextSection")
  async aboutUsAwardTextSectionGet() {
    const section = await this.aboutService.aboutUsAwardTextSectionGet();
    return section;
  }

  // aboutUsAwardTextSection UPDATE single entry
  @Put("/aboutUsAwardTextSection")
  async aboutUsAwardTextSectionUpdate(@Body() body: Partial<{ title: string; extraTitle?: string; subtitle?: string; upText?: string }>) {
    const updated = await this.aboutService.aboutUsAwardTextSectionUpdate(body);
    return { message: 'Updated successfully', updated };
  }

  // aboutUsAwardTextSection DELETE single entry
  @Delete("/aboutUsAwardTextSection")
  async aboutUsAwardTextSectionDelete() {
    await this.aboutService.aboutUsAwardTextSectionDelete();
    return { message: 'Deleted successfully' };
  }

  // aboutUsAwardRecords CREATE
  @Post("/aboutUsAwardRecords")
  async aboutUsAwardRecordsCreate(@Body() body: { year: string; title: string; subtitle: string }) {
    if (!body.year || !body.title || !body.subtitle) {
      throw new BadRequestException('year, title, and subtitle are required');
    }
    const record = await this.aboutService.aboutUsAwardRecordCreate(body);
    return { message: 'Award record created', record };
  }

  //aboutUsAwardRecords GET ALL
  @Get("/aboutUsAwardRecords")
  async aboutUsAwardRecordsGetAll() {
    const records = await this.aboutService.aboutUsAwardRecordGet();
    return records;
  }

  //aboutUsAwardRecords UPDATE
  @Put('/aboutUsAwardRecords/:id')
  async aboutUsAwardRecordsUpdate(
    @Param('id') id: string,
    @Body() body: Partial<{ year: string; title: string; subtitle: string }>,
  ) {
    const updated = await this.aboutService.aboutUsAwardRecordUpdate(id, body);
    return { message: 'Award record updated', updated };
  }

  //aboutUsAwardRecords DELETE
  @Delete('/aboutUsAwardRecords/:id')
  async aboutUsAwardRecordsDelete(@Param('id') id: string) {
    await this.aboutService.aboutUsAwardRecordDelete(id);
    return { message: 'Award record deleted' };
  }

   //aboutUsJourneyTextSection CREATE — only one allowed
  @Post("/aboutUsJourneyTextSection")
  async aboutUsJourneyTextSectionCreate(@Body() body: { title: string; subtitle: string; upText?: string }) {
    if (!body.title || !body.subtitle) {
      throw new BadRequestException('title and subtitle are required');
    }
    const section = await this.aboutService.aboutUsJourneyTextSectionCreate(body);
    return { message: 'Journey text section created', section };
  }

  //aboutUsJourneyTextSection GET single entry
  @Get("/aboutUsJourneyTextSection")
  async aboutUsJourneyTextSectionGet() {
    const section = await this.aboutService.aboutUsJourneyTextSectionGet();
    return section;
  }

  //aboutUsJourneyTextSection UPDATE single entry (partial update allowed)
  @Put("/aboutUsJourneyTextSection")
  async aboutUsJourneyTextSectionUpdate(@Body() body: Partial<{ title: string; subtitle: string; upText?: string }>) {
    const updated = await this.aboutService.aboutUsJourneyTextSectionUpdate(body);
    return { message: 'Journey text section updated', updated };
  }

  //aboutUsJourneyTextSection DELETE single entry
  @Delete("/aboutUsJourneyTextSection")
  async aboutUsJourneyTextSectionDelete() {
    await this.aboutService.aboutUsJourneyTextSectionDelete();
    return { message: 'Journey text section deleted' };
  }

  
  //aboutUsJourneyTimeline CREATE
  @Post("/aboutUsJourneyTimeline")
  async aboutUsJourneyTimelineCreate(
    @Body() body: { startYear: string; endYear: string; title: string; description: string },
  ) {
    const timeline = await this.aboutService.aboutUsJourneyTimelineCreate(body);
    return { message: 'Timeline created', timeline };
  }

  //aboutUsJourneyTimeline GET ALL
  @Get("/aboutUsJourneyTimeline")
  async aboutUsJourneyTimelineGetAll() {
    const timelines = await this.aboutService.aboutUsJourneyTimelineGet();
    return timelines;
  }

  //aboutUsJourneyTimeline UPDATE
  @Put('/aboutUsJourneyTimeline/:id')
  async aboutUsJourneyTimelineUpdate(
    @Param('id') id: string,
    @Body()
    body: Partial<{ startYear: string; endYear: string; title: string; description: string }>,
  ) {
    const updated = await this.aboutService.aboutUsJourneyTimelineUpdate(id, body);
    return { message: 'Timeline updated', updated };
  }

  //aboutUsJourneyTimeline DELETE (soft delete)
  @Delete('/aboutUsJourneyTimeline/:id')
  async aboutUsJourneyTimelineDelete(@Param('id') id: string) {
    await this.aboutService.aboutUsJourneyTimelineDelete(id);
    return { message: 'Timeline deleted' };
  }
  // CREATE
  @Post('/aboutUsLeadership')
  @UseInterceptors(FileInterceptor('image', { storage: fileUploader.storage }))
  async aboutUsLeadershipCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') dataString: string,
  ) {
    let data: { quote: string; name: string; designation: string };
    try {
      data = JSON.parse(dataString);
    } catch {
      throw new BadRequestException('Data must be valid JSON');
    }

    const created = await this.aboutService.aboutUsLeadershipCreate(file, data);
    return { message: 'Leadership entry created', data: created };
  }

  // GET ALL
  @Get("/aboutUsLeadership")
  async aboutUsLeadershipGetAll() {
    return this.aboutService.aboutUsLeadershipGet();
  }

  // UPDATE
  @Put('/aboutUsLeadership/:id')
  @UseInterceptors(FileInterceptor('image', { storage: fileUploader.storage }))
  async aboutUsLeadershipUpdate(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
    @Body('data') dataString?: string,
  ) {
    let data: Partial<{ quote: string; name: string; designation: string }> = {};
    if (dataString) {
      try {
        data = JSON.parse(dataString);
      } catch {
        throw new BadRequestException('Data must be valid JSON');
      }
    }

    const updated = await this.aboutService.aboutUsLeadershipUpdate(id, file, data);
    return { message: 'Leadership entry updated', data: updated };
  }

  // DELETE
  @Delete('/aboutUsLeadership/:id')
  async aboutUsLeadershipDelete(@Param('id') id: string) {
    await this.aboutService.aboutUsLeadershipDelete(id);
    return { message: 'Leadership entry deleted' };
  }


  // aboutUsTestimonial CREATE
  @Post("/aboutUsTestimonial")
  async aboutUsTestimonialCreate(
    @Body()
    body: {
      message: string;
      company: string;
      rating: number;
      name: string;
      designation: string;
    },
  ) {
    const testimonial = await this.aboutService.aboutUsTestimonialCreate(body);
    return { message: 'Testimonial created successfully', testimonial };
  }

  // aboutUsTestimonial GET
  @Get("/aboutUsTestimonial")
  async aboutUsTestimonialGet() {
    return this.aboutService.aboutUsTestimonialGet();
  }

  // aboutUsTestimonial UPDATE
  @Put('/aboutUsTestimonial/:id')
  async aboutUsTestimonialUpdate(
    @Param('id') id: string,
    @Body()
    body: Partial<{
      message: string;
      company: string;
      rating: number;
      name: string;
      designation: string;
    }>,
  ) {
    const updated = await this.aboutService.aboutUsTestimonialUpdate(id, body);
    return { message: 'Testimonial updated successfully', updated };
  }

  //aboutUsTestimonial DELETE
  @Delete('/aboutUsTestimonial/:id')
  async aboutUsTestimonialDelete(@Param('id') id: string) {
    await this.aboutService.aboutUsTestimonialDelete(id);
    return { message: 'Testimonial deleted successfully' };
  }

  //aboutUsBuildSection CREATE

  @Post("/aboutUsBuildSection")
  async aboutUsBuildSectionCreate(
    @Body()
    body: {
      heading: string;
      highlightedText?: string;
      description?: string;
      position?: number;
    },
  ) {
    const section = await this.aboutService.aboutUsBuildSectionCreate(body);
    return { message: 'Build section created', section };
  }

  // aboutUsBuildSection GET
  @Get("/aboutUsBuildSection")
  async aboutUsBuildSectionGet() {
    return this.aboutService.aboutUsBuildSectionGet();
  }

  // aboutUsBuildSectionUPDATE
  @Put("/aboutUsBuildSection")
  async aboutUsBuildSectionUpdate(
    @Body()
    body: Partial<{
      heading: string;
      highlightedText?: string;
      description?: string;
      position?: number;
    }>,
  ) {
    const updated = await this.aboutService.aboutUsBuildSectionUpdate(body);
    return { message: 'Build section updated', updated };
  }

  // aboutUsBuildSection DELETE
  @Delete("/aboutUsBuildSection")
  async aboutUsBuildSectionDelete() {
    await this.aboutService.aboutUsBuildSectionDelete();
    return { message: 'Build section deleted' };
  }
}



