import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NewsAndBlogsService } from './newsAndBlogs.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { fileUploader, upload, uploadToCloudinary } from 'src/helper/fileUploader';


@Controller()
export class NewsAndBlogsController {
  constructor(private readonly newsService: NewsAndBlogsService) {}

   // newsAndBlogs Create (one time only)
  @Post("/news-and-blogs-text")
  newsAndBlogscreate(
    @Body()
    body: {
      page: string;
      title: string;
      subtitle: string;
    },
  ) {
    return this.newsService.newsAndBlogscreate(body);
  }

  //newsAndBlogs Get content
  @Get("/news-and-blogs-text")
  newsAndBlogsfindOne() {
    return this.newsService.newsAndBlogsFindOne();
  }

  @Put('/news-and-blogs-text/:id')
  newsAndBlogsUpdate(
    @Param('id') id: string,
    @Body()
    body: {
      page?: string;
      title?: string;
      subtitle?: string;
      isActive?: boolean;
    },
  ) {
    return this.newsService.newsAndBlogsupdate(id, body);
  }


  //newsAndBlogs Permanent delete
  @Delete('/news-and-blogs-text/:id')
  newsAndBlogsdelete(@Param('id') id: string) {
    return this.newsService.newsAndBlogsdelete(id);
  }

   // news CREATE
  @Post("/news")
  @UseInterceptors(FileInterceptor('image', {
    storage: fileUploader.storage,
  }))
  async newsCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    return this.newsService.newsCreate(JSON.parse(data), file);
  }

  // news GET ALL
  @Get("/news")
  newsFindAll() {
    return this.newsService.newsFindAll();
  }

  //news GET BY ID
  @Get('/news/:id')
  newsFindById(@Param('id') id: string) {
    return this.newsService.newsFindById(id);
  }

  // news UPDATE
  @Put('/news/:id')
  @UseInterceptors(FileInterceptor('image', {
      storage: fileUploader.storage,
    }))
  async newsUpdate(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    return this.newsService.newsUpdate(id, JSON.parse(data), file);
  }

  // DELETE
  @Delete('/news/:id')
  newsDelete(@Param('id') id: string) {
    return this.newsService.newsDelete(id);
  }

  // Create subscriber
  @Post("/subscribers")
  async subscriberCreate(@Body() body: { email: string; name?: string; source?: string }) {
    return this.newsService.subscriberCreate(body);
  }

  // Get all subscribers
  @Get("/subscribers")
  findAll() {
    return this.newsService.subscriberFindAll();
  }

  // Get subscriber by ID
  @Get("/subscribers/:id")
  findById(@Param('id') id: string) {
    return this.newsService.subscriberFindById(id);
  }

  // Get subscriber by email (query param)
  // Example: GET /subscribers/email?value=someone@example.com
   @Get('/subscribers/email')
  async findByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.newsService.subscriberFindByEmail(email);
  }

  // Delete subscriber by ID
  @Delete('/subscribers/:id')
  delete(@Param('id') id: string) {
    return this.newsService.subscriberDelete(id);
  }

 // CREATE section (one-time)
  @Post("newsletter-section")
  async newsletterCreate(
    @Body() body: { heading: string; subheading: string; section:string; description: string },
  ) {
    return this.newsService.newsletterSectionCreate(body);
  }

  // GET section
  @Get("newsletter-section")
  async newsletterGet() {
    return this.newsService.newsletterSectionGet();
  }

  // UPDATE section
  @Put("newsletter-section")
  async newsletterUpdate(
    @Body() body: { heading?: string; subheading?: string; section?:string; description?: string },
  ) {
    return this.newsService.newsletterSectionUpdate(body);
  }

@Post("/reports")
  async reportCreate(
    @Body()
    body: {
      category?: string;
      title: string;
      description: string;
      publishDate: string;
      downloadUrl?: string;
    },
  ) {
    return this.newsService.reportCreate(body);
  }

  // Get all reports
  @Get("/reports")
  async reportGetAll() {
    return this.newsService.reportGetAll();
  }

  // Get report by ID
  @Get('/reports/:id')
  async reportGetById(@Param('id') id: string) {
    return this.newsService.reportGetById(id);
  }

  // Update report by ID
  @Put('/reports/:id')
  async reportUpdate(
    @Param('id') id: string,
    @Body()
    body: Partial<{
      category: string;
      title: string;
      description: string;
      publishDate: string;
      downloadUrl: string;
    }>,
  ) {
    return this.newsService.reportUpdate(id, body);
  }

  // Delete report by ID
  @Delete('/reports/:id')
  async reportDelete(@Param('id') id: string) {
    return this.newsService.reportDelete(id);
  }

}
