export interface BaseDomainRepository<DomainModel> {
  create(data: Partial<DomainModel>): Promise<{ id: string }>
  findAll(): Promise<DomainModel[]>
  findById(id: string): Promise<DomainModel | null>
  updateById(
    id: string,
    updateData: Partial<DomainModel>,
  ): Promise<DomainModel | null>
  deleteById(id: string): Promise<void>
  deleteAll(): Promise<void>
  findByParam<ParamType>(
    param: Partial<ParamType>,
    paginateObj?: { page: number; limit: number },
  ): Promise<DomainModel[]>
}
