import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { PostsService } from './posts.service';
import { POST_SERVICE } from './posts.constants';
import { ILogger } from '../logger/abstract/logger.interface';

@Controller('posts')
export class PostsController {
  private readonly logger: ILogger = new Logger(PostsController.name);
  constructor(
    @Inject(POST_SERVICE) private readonly postService: PostsService,
  ) {}

  @Get()
  public async getLastPosts() {
    this.logger.log('In Posts Controller...');
    return this.postService.getLastPosts();
  }
}
