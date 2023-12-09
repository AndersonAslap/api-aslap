import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import validationOptions from './utils/validation-options';
import 'dotenv';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = ['http://olga.local:8080', /olga\.digital/];

  app.enableCors({
    origin: allowedOrigins,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const config = new DocumentBuilder()
    .setTitle('Olga Seguros')
    .setDescription('APIs necessárias para a jornada de compra de proteção')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
    customSiteTitle: 'API Olga - Seguros Incorporados',
    customCss: '.topbar { display: none; }',
    url: 'teste',
  };

  SwaggerModule.setup('swagger', app, document, customOptions);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
