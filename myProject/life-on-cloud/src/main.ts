import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "./pipes/valid.pipe"
import { ResponseInterceptor } from './response.interceptor';
import { HttpExceptionFilter } from './ExceptionFilter/HttpException';

async function run() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors(new ResponseInterceptor())
  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(configService.get("SERVER.PORT"));
}
run();
