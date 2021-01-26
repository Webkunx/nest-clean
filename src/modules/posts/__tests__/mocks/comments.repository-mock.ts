import { CommentsRepository } from '../../dbl/comments.repository';
import { Comment, Post } from '../../post.domain';
import { WhereClause } from '../../../../common/abstract/base.repository';

export class CommentsRepositoryMock implements CommentsRepository {
  findById(id: string): Promise<Comment> {
    return Promise.resolve(undefined);
  }

  findCommentsForPost(post: Post): Promise<Comment[]> {
    return Promise.resolve([]);
  }

  findManyByQuery(query: WhereClause<Comment>): Promise<Comment[]> {
    return Promise.resolve([]);
  }

  findManyLast(limit: number): Promise<Comment[]> {
    return Promise.resolve([]);
  }

  findMostLikedForPost(post: Post, limit: number): Promise<Comment[]> {
    return Promise.resolve([]);
  }
}
