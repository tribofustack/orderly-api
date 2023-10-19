export interface IRepository<T> {
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(params: Partial<T>): Promise<T | void>;
  delete(id: string): Promise<void>;
  update(id: string, params: Partial<T>): Promise<void>;
}
