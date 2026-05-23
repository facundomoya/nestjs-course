import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ErrorLoggingInterceptor } from './common/interceptors/logger.interceptor';
import { Logger } from '@nestjs/common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
app.useGlobalInterceptors(new ErrorLoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
