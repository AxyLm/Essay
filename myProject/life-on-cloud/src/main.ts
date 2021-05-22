import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "./pipes/valid.pipe"
import { ResponseInterceptor } from './response.interceptor';
import { HttpExceptionFilter } from './ExceptionFilter/HttpException';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function run() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('life on cloud')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(configService.get("SERVER.PORT"));
}
run();
