import { Global, Module } from '@nestjs/common';
import { PinoLoggerService } from './pino-logger.service';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './logger.constants';

@Global()
@Module({
  providers: [
    PinoLoggerService,
    { provide: ASYNC_STORAGE, useValue: new AsyncLocalStorage() },
  ],
  exports: [PinoLoggerService, ASYNC_STORAGE],
})
export class LoggerModule {}
