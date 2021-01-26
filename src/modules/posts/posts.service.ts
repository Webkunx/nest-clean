import { Comment, Post, PostWithComments } from './post.domain';
import { PostsRepository } from './dbl/posts.repository';
import { CommentsRepository } from './dbl/comments.repository';
import { PostMapper } from './post.mapper';
import { ILogger } from '../logger/abstract/logger.interface';

export class PostsService {
  constructor(
    private readonly logger: ILogger,
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}
  public async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new Error('Cannot get post with such id');
    }
    return post;
  }
  public async getLastPosts(limit = 100): Promise<Post[]> {
    this.logger.log('Getting last posts...');
    return this.postsRepository.findManyLast(limit);
  }
  public async getPostByIdWithComments(id: string): Promise<PostWithComments> {
    const post = await this.getPostById(id);
    const comments = await this.commentsRepository.findCommentsForPost(post);
    return PostMapper.mapPostAndCommentsToPostWithComments(post, comments);
  }
  public async getMostLikedCommentsForPostById(id: string): Promise<Comment[]> {
    const post = await this.getPostById(id);
    return this.commentsRepository.findMostLikedForPost(post, 10);
  }
  public async getRecommendedPosts(): Promise<Post[]> {
    const mostCommented = await this.postsRepository.findMostCommented(10);
    const mostRecent = await this.postsRepository.findManyLast(10);
    return [...mostCommented, ...mostRecent];
  }
}
