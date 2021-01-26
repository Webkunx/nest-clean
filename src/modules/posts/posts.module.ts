import { Module } from '@nestjs/common';
import { PostsRepositoryImpl } from './dbl/posts.repository';
import { CommentsRepositoryImpl } from './dbl/comments.repository';
import { postsServiceFactoryProvider } from './providers/posts-service-provider';
import { PostsController } from './posts.controller';

@Module({
  providers: [
    PostsRepositoryImpl,
    CommentsRepositoryImpl,
    postsServiceFactoryProvider,
  ],
  controllers: [PostsController],
})
export class PostsModule {}
