export class Comment {
  constructor(public id: string, text: string, likes: number) {}
}

export class Post {
  constructor(public id: string, public name: string, public text: string) {}
}
export class PostWithComments extends Post {
  constructor(
    public id: string,
    public name: string,
    public text: string,
    public comments: Comment[],
  ) {
    super(id, name, text);
  }
}
