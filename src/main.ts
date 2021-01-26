import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLoggerService } from './modules/logger/pino-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get<PinoLoggerService>(PinoLoggerService));

  await app.listen(3000);
}
bootstrap();
