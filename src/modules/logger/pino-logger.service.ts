import { ILogger } from './abstract/logger.interface';
import * as pino from 'pino';
import { AsyncStorage } from './abstract/storage';
import { Inject, Injectable } from '@nestjs/common';
import { ASYNC_STORAGE } from './logger.constants';

@Injectable()
export class PinoLoggerService implements ILogger {
  private readonly pino: pino.Logger;
  constructor(
    @Inject(ASYNC_STORAGE) private readonly asyncStorage: AsyncStorage,
  ) {
    this.pino = pino({
      prettyPrint: {
        colorize: true,

        translateTime: "yyyy-mm-dd'T'HH:MM:ss",
      },
      base: null,
    });
  }
  private static getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }
  error(message: any, trace?: string, context?: string): any {
    this.pino.error(PinoLoggerService.getMessage(message, context));
    if (trace) {
      this.pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');

    this.pino.info({ traceId }, PinoLoggerService.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    this.pino.warn(PinoLoggerService.getMessage(message, context));
  }
}
