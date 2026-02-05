import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { HomeService } from './home.service';
import { fileUploader, upload } from 'src/helper/fileUploader';
import { CreateHeroBannerDto, CreateLegacySectionDto, UpdateLegacySectionDto } from './homeDTO';
import { prisma } from './../helper/prisma';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // Home banner create
  @Post('/heroBanner')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: fileUploader.storage,
    }),
  )
  async createHeroBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    if (!data) {
      throw new BadRequestException('Data field is missing');
    }

    let parsedData: CreateHeroBannerDto;

    try {
      parsedData = JSON.parse(data);
    } catch {
      throw new BadRequestException('Invalid JSON format');
    }

    return this.homeService.createHeroBanner(parsedData, file);
  }


  // Home banner get
  @Get('/heroBanner')
  async getHeroBanners() {
    return this.homeService.getHeroBanners();
  }

  //get individual banner
  @Get('/heroBanner/:id')
async getHeroBannerById(@Param('id') id: string) {
  return this.homeService.getHeroBannerById(id);
}

  // Update existing home banner 

@Put('/heroBanner/:id')
@UseInterceptors(
  FileInterceptor('image', {
    storage: fileUploader.storage,
  }),
)
async updateHeroBanner(
  @Param('id') id: string,
  @UploadedFile() file?: Express.Multer.File,
  @Body('data') data?: string,
) {
  let parsedData = {};

  if (data) {
    try {
      parsedData = JSON.parse(data);
    } catch {
      throw new BadRequestException('Invalid JSON format');
    }
  }

  return this.homeService.updateHeroBanner(id, parsedData, file);
}

//delete hero banner 
@Delete('/heroBanner/:id')
  async deleteHeroBanner(@Param('id') id: string) {
    return this.homeService.deleteHeroBanner(id);
  }

// create text
  @Post("/text")
  create(@Body() dto: CreateLegacySectionDto) {
    return this.homeService.textSectionCreate(dto);
  }

  @Get('/text')
  getAll() {
    return this.homeService.textSectionGetAll();
  }
// get text by id
  @Get('/text/:id')
  getById(@Param('id') id: string) {
    return this.homeService.textSectionGetById(id);
  }
// update by id text
  @Put('/text/:id')
  update(@Param('id') id: string, @Body() dto: UpdateLegacySectionDto) {
    return this.homeService.textSectionUpdate(id, dto);
  }
// delete text
  @Delete('/text/:id')
  remove(@Param('id') id: string) {
    return this.homeService.textSectionRemove(id);
  }






  @Post("/featuredImage")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
      ],
      {
      storage: fileUploader.storage,
    }
,
    ),
  )
  featuredImageCreate(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      icon?: Express.Multer.File[];
    },
    @Body('data') data: string,
  ) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch {
      throw new BadRequestException('Invalid JSON in data field');
    }

    return this.homeService.featuredImageCreate(
      parsedData,
      files.image?.[0],
      files.icon?.[0],
    );
  }

  @Get("/featuredImage")
  featuredImageGetAll() {
    return this.homeService.featuredImageGetAll();
  }

  @Get('/featuredImage/:id')
  featuredImageGetById(@Param('id') id: string) {
    return this.homeService.featuredImageGetById(id);
  }

  @Put('/featuredImage/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
      ],
      {
      storage: fileUploader.storage,
    }
    ),
  )
  featuredImageUpdate(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      icon?: Express.Multer.File[];
    },
    @Body('data') data: string,
  ) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch {
      throw new BadRequestException('Invalid JSON in data field');
    }

    return this.homeService.featuredImageUpdate(
      id,
      parsedData,
      files.image?.[0],
      files.icon?.[0],
    );
  }

  @Delete('/featuredImage/:id')
  featuredImageDelete(@Param('id') id: string) {
    return this.homeService.featuredImageDelete(id);
  }


  // ✅ GET: active + ordered companyExperienceText
  @Get("/companyExperienceText")
  getCompanyExperience() {
    return this.homeService.getCompanyExperience();
  }

  // ✅ GET by ID companyExperienceText
  @Get('/companyExperienceText/:id')
  getCompanyExperienceByID(@Param('id') id: string) {
    return this.homeService.getCompanyExperienceById(id);
  }

  // ✅ CREATE companyExperienceText
  @Post("/companyExperienceText")
  createCompanyExperience(
    @Body() body
  ) {
    return this.homeService.createCompanyExperience(body);
  }

  // ✅ UPDATE companyExperienceText
  @Put('/companyExperienceText/:id')
  updateCompanyExperience(
    @Param('id') id: string,
    @Body() body
  ) {
    return this.homeService.updateCompanyExperience(id, body);
  }

  // ✅ DELETE companyExperienceText
  @Delete('/companyExperienceText/:id')
  deleteCompanyExperience(@Param('id') id: string) {
    return this.homeService.deleteCompanyExperience(id);
  }

// 🔧 helper to safely parse JSON
  private parseData(data?: string) {
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch {
      throw new BadRequestException('Invalid JSON in data field');
    }
  }

  // ✅ propertySearch CREATE
  @Post('/propertySearch')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'icons', maxCount: 1 },
      ],
      { storage: fileUploader.storage },
    ),
  )
  property_search_stepCreate(
    @Body('data') data: string,
    @UploadedFiles()
    files?: {
      image?: Express.Multer.File[];
      icons?: Express.Multer.File[];
    },
  ) {
    const parsedData = this.parseData(data);
    return this.homeService.property_search_stepCreate(parsedData, files);
  }

  // ✅ propertySearch GET ALL
  @Get('/propertySearch')
  property_search_stepsGetAll() {
    return this.homeService.property_search_stepsGetAll();
  }

  // ✅propertySearch GET BY ID
  @Get('/propertySearch/:id')
  property_search_stepGetByID(@Param('id') id: string) {
    return this.homeService.property_search_stepGetByID(id);
  }

  // ✅propertySearch UPDATE (client choice)
  @Put('/propertySearch/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'icons', maxCount: 1 },
      ],
      { storage: fileUploader.storage },
    ),
  )
  property_search_stepUpdate(
    @Param('id') id: string,
    @Body('data') data?: string,
    @UploadedFiles()
    files?: {
      image?: Express.Multer.File[];
      icons?: Express.Multer.File[];
    },
  ) {
    const parsedData = this.parseData(data);
    return this.homeService.property_search_stepUpdate(
      id,
      parsedData,
      files,
    );
  }

  // ✅propertySearch DELETE
  @Delete('/propertySearch/:id')
  property_search_stepDelete(@Param('id') id: string) {
    return this.homeService.property_search_stepDelete(id);
  }

// get ContactInfo 
  @Get("/contactInfo")
  async getContactInfo() {
    return this.homeService.getContactInfo();
  }
// cerate ContactInfo 
  @Post("/contactInfo")
  async postContactInfo(@Body() body: any) {
    return this.homeService.createContactInfo(body);
  }
//update ContactInfo 
  @Put('/contactInfo/:id')
  async updateContactInfo(@Param('id') id: string, @Body() body: any) {
    return this.homeService.updateContactInfo(id, body);
  }
// delete ContactInfo 
  @Delete('/contactInfo/:id')
  async deleteContactInfo(@Param('id') id: string) {
    return this.homeService.deleteContactInfo(id);
  }
  
  
  // =========================
  // CREATE testimonial
  // =========================
  @Post("/testimonial")
  async createTestimonial(@Body() body: any) {
    return this.homeService.createTestimonial(body);
  }

  // =========================
  // GET all testimonials
  // =========================
  @Get("/testimonial")
  async getAllTestimonials() {
    return this.homeService.getAllTestimonials();
  }

  // =========================
  // GET testimonial by ID
  // =========================
  @Get('/testimonial/:id')
  async getTestimonialById(@Param('id') id: string) {
    return this.homeService.getTestimonialById(id);
  }

  // =========================
  // UPDATE testimonial by ID
  // =========================
  @Put('/testimonial/:id')
  async updateTestimonial(@Param('id') id: string, @Body() body: any) {
    return this.homeService.updateTestimonial(id, body);
  }

  // =========================
  // DELETE testimonial by ID
  // =========================
  @Delete('/testimonial/:id')
  async deleteTestimonial(@Param('id') id: string) {
    return this.homeService.deleteTestimonial(id);
  }
}






