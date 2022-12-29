import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({origin: '*'})
  await app.listen(26799, '0.0.0.0', () => console.log('Fm-Gateway is Running!'));
}

bootstrap();
