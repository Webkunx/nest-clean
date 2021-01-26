import { CommentsRepositoryMock } from './mocks/comments.repository-mock';
import { PostsRepositoryImpl } from '../dbl/posts.repository';
import { PostsService } from '../posts.service';
import { TestingLogger } from '@nestjs/testing/services/testing-logger.service';
import { Comment, Post, PostWithComments } from '../post.domain';
import SpyInstance = jest.SpyInstance;

describe('PostsService', () => {
  const commentRepository = new CommentsRepositoryMock();
  const postsRepository = new PostsRepositoryImpl();
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService(
      new TestingLogger(),
      postsRepository,
      commentRepository,
    );
  });
  describe('getPostById', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(postsRepository, 'findById');
    });
    afterEach(() => {
      spy.mockClear();
    });

    it('should find post', async () => {
      const postMock = new Post('id', 'name', 'text');
      spy.mockResolvedValue(postMock);
      const result = await postsService.getPostById('id');
      expect(result).toBeInstanceOf(Post);
      expect(result.name).toBeDefined();
    });
    it('should throw Error', async () => {
      spy.mockResolvedValue(null);
      let errorMessage: string;
      let post: Post;
      try {
        post = await postsService.getPostById('id');
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBeDefined();
      expect(post).toBeUndefined();
    });
  });
  describe('getPostByIdWithComments', () => {
    let getPostByIdSpy: SpyInstance;
    let commentsRepositorySpy: SpyInstance;
    beforeEach(() => {
      getPostByIdSpy = jest.spyOn(postsService, 'getPostById');
      commentsRepositorySpy = jest.spyOn(
        commentRepository,
        'findCommentsForPost',
      );
    });
    it('should return post with comments',  async() => {
      const postMock = new Post('id', 'name', 'text');
      const commentMock = new Comment('id', 'name', 12);
      getPostByIdSpy.mockResolvedValue(postMock);
      commentsRepositorySpy.mockResolvedValue([commentMock]);
      const result = await postsService.getPostByIdWithComments('id');
      expect(result).toBeInstanceOf(PostWithComments);
      expect(result.name).toBeDefined();
      expect(result.comments.length).toBe(1);
    });
  });
  describe('getLastPosts', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(postsRepository, 'findManyLast');
    });
    afterEach(() => {
      spy.mockClear();
    });
    it('should return posts', async () => {
      const postMock = new Post('id', 'name', 'text');
      spy.mockResolvedValue([postMock, postMock]);
      const result = await postsService.getLastPosts();
      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(result[1]).toBeInstanceOf(Post);
    });
  });

  describe('getRecommendedPosts', () => {
    let findMostCommentedSpy: SpyInstance;
    let findManyLastSpy: SpyInstance;
    beforeEach(() => {
      findMostCommentedSpy = jest.spyOn(postsRepository, 'findMostCommented');
      findManyLastSpy = jest.spyOn(postsRepository, 'findManyLast');
    });
    it('should return not empty array', async () => {
      const postMock = new Post('id', 'name', 'text');
      findMostCommentedSpy.mockResolvedValue([postMock, postMock]);
      findManyLastSpy.mockResolvedValue([postMock, postMock]);
      const result = await postsService.getRecommendedPosts();
      expect(result).toBeDefined();
      expect(result.length).toBe(4);
      expect(result[1]).toBeInstanceOf(Post);
    });
  });
});
