import { Comment, Post, PostWithComments } from './post.domain';

export class PostMapper {
  static mapPostAndCommentsToPostWithComments(
    post: Post,
    comments: Comment[],
  ): PostWithComments {
    const { id, text, name } = post;
    return new PostWithComments(id, text, name, comments);
  }
}
