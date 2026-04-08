import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UpdateCareerPageDto } from './dto/update-career-page.dto';
import { CreateValueDto } from './dto/create-value.dto';
import { CreatePerkDto } from './dto/create-perk.dto';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) { }

  @Get('page')
  getCareerPage() {
    return this.careerService.getCareerPage();
  }

  @Patch('page')
  updateCareerPage(@Body() dto: UpdateCareerPageDto) {
    return this.careerService.updateCareerPage(dto);
  }

  // Values
  @Get('values')
  getValues() {
    return this.careerService.getValues();
  }

  @Post('values')
  createValue(@Body() dto: CreateValueDto) {
    return this.careerService.createValue(dto);
  }

  @Delete('values/:id')
  deleteValue(@Param('id') id: string) {
    return this.careerService.deleteValue(id);
  }

  // Perks
  @Get('perks')
  getPerks() {
    return this.careerService.getPerks();
  }

  @Post('perks')
  createPerk(@Body() dto: CreatePerkDto) {
    return this.careerService.createPerk(dto);
  }

  @Delete('perks/:id')
  deletePerk(@Param('id') id: string) {
    return this.careerService.deletePerk(id);
  }

  @Post('jobs')
  createJob(@Body() createJobDto: CreateJobDto) {
    return this.careerService.createJob(createJobDto);
  }

  @Get('jobs')
  findAllJobs() {
    return this.careerService.findAllJobs();
  }

  @Get('jobs/:id')
  findOneJob(@Param('id') id: string) {
    return this.careerService.findOneJob(id);
  }

  @Patch('jobs/:id')
  updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.careerService.updateJob(id, updateJobDto);
  }

  @Delete('jobs/:id')
  removeJob(@Param('id') id: string) {
    return this.careerService.removeJob(id);
  }
}
