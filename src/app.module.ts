import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { PostsModule } from './modules/posts/posts.module';
import { AsyncStorageInterceptor } from './common/interceptors/async-storage.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [LoggerModule, PostsModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AsyncStorageInterceptor,
    },
  ],
})
export class AppModule {}
