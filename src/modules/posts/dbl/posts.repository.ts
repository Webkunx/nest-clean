import { Post } from '../post.domain';
import {
  BaseRepository,
  WhereClause,
} from '../../../common/abstract/base.repository';
import { Injectable } from '@nestjs/common';

export interface PostsRepository extends BaseRepository<Post> {
  findMostCommented(limit: number): Promise<Post[]>;
}

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  findManyByQuery(query: WhereClause<Post>): Promise<Post[]> {
    return Promise.resolve([]);
  }

  findManyLast(limit: number): Promise<Post[]> {
    return Promise.resolve([]);
  }

  findMostCommented(limit: number): Promise<Post[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<Post> {
    return Promise.resolve({} as Post);
  }
}
