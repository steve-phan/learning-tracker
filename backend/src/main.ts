import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with whitelist
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'PATCH'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
