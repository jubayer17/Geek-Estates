import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { CareerModule } from './career/career.module';
import { ProjectsModule } from './projects/projects.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { NewsAndBlogsModule } from './news_and_blogs/newsAndBlogs.module';

@Module({
  imports: [HomeModule, AdminModule, CareerModule, ProjectsModule,AboutModule,NewsAndBlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
