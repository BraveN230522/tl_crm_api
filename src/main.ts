import { TransformInterceptor } from './common/transformers/transform.interceptor';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import multer from 'multer';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { AppConfigService } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const upload = multer();
  const configService = app.get<ConfigService>(ConfigService);
  const appConfigService = app.get(AppConfigService);

  // for parsing application/json
  app.use(express.json());

  // for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // for parsing multipart/form-data
  app.use(express.static('public'));
  app.use(upload.single('undefined'));

  // global setup
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // refer: https://github.com/typestack/class-validator#using-service-container
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  //global prefix
  app.setGlobalPrefix(appConfigService.baseUrlPrefix);

  await app.listen(configService.get<string>('SERVER_PORT'));
}
bootstrap();
