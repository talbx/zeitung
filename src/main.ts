import { NestFactory } from '@nestjs/core';
import { ZeitungModule } from './zeitung.module';

async function bootstrap() {
  const app = await NestFactory.create(ZeitungModule);
  await app.listen(3000);
}
bootstrap();
