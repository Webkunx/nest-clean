import { FactoryProvider, Logger } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { PostsRepository, PostsRepositoryImpl } from '../dbl/posts.repository';
import {
  CommentsRepository,
  CommentsRepositoryImpl,
} from '../dbl/comments.repository';
import { POST_SERVICE } from '../posts.constants';

export const postsServiceFactoryProvider: FactoryProvider<PostsService> = {
  provide: POST_SERVICE,
  useFactory: (
    postsRepository: PostsRepository,
    commentsRepository: CommentsRepository,
  ) => {
    return new PostsService(
      new Logger(PostsService.name),
      postsRepository,
      commentsRepository,
    );
  },
  inject: [PostsRepositoryImpl, CommentsRepositoryImpl],
};
