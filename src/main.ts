import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  buildDocumentSwager(app);
  await app.listen(3000);
}

bootstrap();

function buildDocumentSwager(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('ToDo')
    .setDescription('making todo list of user on nest.js')
    .setVersion('0.0.1')
    .addTag('todo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
