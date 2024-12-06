export interface BaseDomainRepository<DomainModel> {
  create(data: Partial<DomainModel>): Promise<{ id: number }>
  findAll(): Promise<DomainModel[]>
  findById(id: string): Promise<DomainModel | null>
  updateById(
    id: string,
    updateData: Partial<DomainModel>,
  ): Promise<DomainModel | null>
  deleteById(id: string): Promise<void>
  deleteAll(): Promise<void>
  findByParam<ParamType>(param: Partial<ParamType>): Promise<DomainModel[]>
}
