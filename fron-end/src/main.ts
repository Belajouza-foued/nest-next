import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Pour autoriser les requêtes cross-origin (CORS), si nécessaire :
  app.enableCors();

  const port = process.env.PORT || 4050;
  await app.listen(port);
  console.log(`API backend démarrée sur le port ${port}`);
}

bootstrap();
