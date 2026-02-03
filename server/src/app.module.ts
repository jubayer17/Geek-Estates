import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { CareerModule } from './career/career.module';
import { ProjectsModule } from './projects/projects.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [HomeModulePrismaModule, AdminModule, CareerModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
