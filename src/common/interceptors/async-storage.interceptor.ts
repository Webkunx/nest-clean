import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import {
  bindCallback,
  bindNodeCallback,
  Observable,
  of,
  Subscriber,
} from 'rxjs';
import { AsyncStorage } from '../../modules/logger/abstract/storage';
import { v4 as uuid } from 'uuid';
import { ASYNC_STORAGE } from '../../modules/logger/logger.constants';
import { tap } from 'rxjs/operators';

export class AsyncStorageInterceptor implements NestInterceptor {
  constructor(
    @Inject(ASYNC_STORAGE) private readonly asyncStorage: AsyncStorage,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const store = new Map().set(
      'traceId',
      request.headers['x-request-id'] || uuid(),
    );

    return new Promise<Promise<any>>(resolve => {
      this.asyncStorage.run(store, () => {
        resolve(next.handle().toPromise());
      });
    });
  }
}
