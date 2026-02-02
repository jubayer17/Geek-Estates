import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { prisma } from './helper/prisma';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
  try {
    // Run a simple query
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`;
    console.log("DB connected:", result);
  } catch (err) {
    console.error("DB connection failed:", err);
  } 
}
bootstrap();
