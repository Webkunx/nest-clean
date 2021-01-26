import {
  BaseRepository,
  WhereClause,
} from '../../../common/abstract/base.repository';
import { Comment, Post } from '../post.domain';
import { Injectable } from '@nestjs/common';

export interface CommentsRepository extends BaseRepository<Comment> {
  findMostLikedForPost(post: Post, limit: number): Promise<Comment[]>;
  findCommentsForPost(post: Post): Promise<Comment[]>;
}

@Injectable()
export class CommentsRepositoryImpl implements CommentsRepository {
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

  findById(id: string): Promise<Comment> {
    return Promise.resolve({} as any);
  }
}
