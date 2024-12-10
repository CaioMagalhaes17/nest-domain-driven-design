import { BaseDomainRepository } from "./base.repository.interface"

export abstract class BaseDomainUseCase<DomainModel> {
  constructor(
    protected readonly repository: BaseDomainRepository<DomainModel>,
  ) {}
  async create(data: Partial<DomainModel>): Promise<{ id: string }> {
    return this.repository.create(data)
  }
  async findAll(): Promise<DomainModel[]> {
    return this.repository.findAll()
  }

  async findById(id: string): Promise<DomainModel | null> {
    return this.repository.findById(id)
  }

  async updateById(
    id: string,
    updateData: Partial<DomainModel>,
  ): Promise<DomainModel | null> {
    return this.repository.updateById(id, updateData)
  }

  async deleteById(id: string): Promise<void> {
    return this.repository.deleteById(id)
  }

  async deleteAll(): Promise<void> {
    return this.repository.deleteAll()
  }
}
