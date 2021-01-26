export type WhereClause<T> = {
  [K in keyof T]: T[K];
};

export interface BaseRepository<T> {
  findManyLast?(limit: number): Promise<T[]>;
  findManyByQuery(query: WhereClause<T>): Promise<T[]>;
  findById(id: string): Promise<T>;
}
