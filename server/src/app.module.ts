import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { CareerModule } from './career/career.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, AdminModule, CareerModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
