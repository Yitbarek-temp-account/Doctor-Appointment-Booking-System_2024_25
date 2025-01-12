import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });
 
  app.use(cookieParser(process.env.JWT_SECRET));
  app.useStaticAssets(path.join(__dirname, '../uploads'));
  await app.listen(3000);
}

bootstrap();
