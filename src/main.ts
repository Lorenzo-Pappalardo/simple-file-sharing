import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const hostname = '0.0.0.0';
  const port = 80;
  const app = await NestFactory.create(AppModule);

  await app.listen(port, hostname, () => {
    console.log(`Listening at ${hostname}:${port}`);
  });
}
bootstrap();
