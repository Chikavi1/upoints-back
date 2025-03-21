import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
    origin: ['http://localhost:4200', 'https://tu-aplicacion-frontend.com'], // Agrega los orígenes permitidos
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

   app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true,transform: true, }));

   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
