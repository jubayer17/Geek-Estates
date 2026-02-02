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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomeService } from './home.service';
import { fileUploader } from 'src/helper/fileUploader';
import { CreateHeroBannerDto } from './homeDTO';

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


}
