import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Loyiha nomi API')
    .setDescription('API tavsifi va foydalanish boʻyicha qoʻllanma')
    .setVersion('1.0')
    .addTag('users') // Teglar bo'yicha guruhlash uchun
    .addBearerAuth() // Agar JWT ishlatsangiz
    .build();
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
