import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { HomeService } from './home.service';
import { fileUploader } from 'src/helper/fileUploader';
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

@Patch('/heroBanner/:id')
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
  @Patch('/text/:id')
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

  @Patch('/featuredImage/:id')
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


  // ✅ GET: active + ordered
  @Get("/companyExperienceText")
  getCompanyExperience() {
    return this.homeService.getCompanyExperience();
  }

  // ✅ GET by ID
  @Get('/companyExperienceText/:id')
  getCompanyExperienceByID(@Param('id') id: string) {
    return this.homeService.getCompanyExperienceById(id);
  }

  // ✅ CREATE
  @Post("/companyExperienceText")
  createCompanyExperience(
    @Body() body
  ) {
    return this.homeService.createCompanyExperience(body);
  }

  // ✅ UPDATE
  @Patch('/companyExperienceText/:id')
  updateCompanyExperience(
    @Param('id') id: string,
    @Body() body
  ) {
    return this.homeService.updateCompanyExperience(id, body);
  }

  // ✅ DELETE
  @Delete('/companyExperienceText/:id')
  deleteCompanyExperience(@Param('id') id: string) {
    return this.homeService.deleteCompanyExperience(id);
  }
}






