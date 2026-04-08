import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { prisma } from './helper/prisma';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = new Set([
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ].filter((value): value is string => Boolean(value)));

  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser clients (Postman, server-to-server, curl).
      if (!origin) return callback(null, true);

      const isAllowedVercelPreview = origin.endsWith('.vercel.app');
      const isAllowedConfiguredOrigin = allowedOrigins.has(origin);

      if (isAllowedVercelPreview || isAllowedConfiguredOrigin) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
  });
  const port = Number(process.env.PORT ?? 4001);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
