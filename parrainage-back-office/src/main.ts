import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('ejs');
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  app.enableCors({
    origin: "http://localhost:4200",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  })

  await app.listen(3000);
}
bootstrap();