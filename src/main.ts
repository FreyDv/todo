import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./common/exceptions-filter/http.exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  buildDocumentSwager(app);

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = await app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 5500;
  await app.listen(PORT, () => {
    console.log('Server star at port: ' + PORT);
  });
}

bootstrap();

function buildDocumentSwager(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('ToDo')
    .setDescription('making todo list of users on nest.js')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
