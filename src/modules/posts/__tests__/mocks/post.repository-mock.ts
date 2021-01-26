import { PostsRepository } from '../../dbl/posts.repository';
import { WhereClause } from '../../../../common/abstract/base.repository';
import { Post } from '../../post.domain';

export class PostRepositoryMock implements PostsRepository {
  findById(id: string): Promise<Post> {
    return Promise.resolve(undefined);
  }

  findManyByQuery(query: WhereClause<Post>): Promise<Post[]> {
    return Promise.resolve([]);
  }

  findManyLast(limit: number): Promise<Post[]> {
    return Promise.resolve([]);
  }

  findMostCommented(limit: number): Promise<Post[]> {
    return Promise.resolve([]);
  }
}
