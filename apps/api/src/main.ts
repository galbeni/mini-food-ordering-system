import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontendUrl = configService.get<string>(
    'FRONTEND_URL',
    'http://localhost:3000',
  );

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mini Food Ordering API')
    .setDescription(
      'REST API for a small fullstack food ordering application built with NestJS, Prisma, PostgreSQL and JWT authentication.',
    )
    .setVersion('1.0.0')
    .addTag('Auth', 'Authentication and current user endpoints')
    .addTag('Restaurants', 'Restaurant and menu browsing endpoints')
    .addTag('Orders', 'Authenticated customer order endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste the JWT access token returned by /auth/login.',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Mini Food Ordering API Docs',
  });

  const port = configService.get<number>('PORT', 3001);

  await app.listen(port);
}

void bootstrap();
