import { Module } from '@nestjs/common';
import { NewsAndBlogsController } from './newsAndBlogs.controller';
import { NewsAndBlogsService } from './newsAndBlogs.service';


@Module({
  imports: [],
  controllers: [NewsAndBlogsController],
  providers: [NewsAndBlogsService],
})
export class NewsAndBlogsModule { }
