import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { prisma } from './helper/prisma';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ].filter((value): value is string => Boolean(value)),
    credentials: true,
  });
  const port = Number(process.env.PORT ?? 4001);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
