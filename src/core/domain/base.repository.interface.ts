export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  updateById(id: string, updateData: Partial<T>): Promise<T | null>
  deleteById(id: string): Promise<void>
  deleteAll(): Promise<void>
  findByParam(param: Partial<T>): Promise<T[]>
}
