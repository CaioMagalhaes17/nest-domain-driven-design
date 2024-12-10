/* eslint-disable prettier/prettier */
import { Model } from "mongoose"
import { BaseDomainRepository } from "../domain/base.repository.interface"
import { BaseMapper } from "./base.mapper"

export abstract class BaseInfraRepository<InfraModel, DomainModel>
  implements BaseDomainRepository<DomainModel> {
  constructor(
    protected readonly model: Model<InfraModel>,
    protected readonly mapper: BaseMapper<InfraModel, DomainModel>,
  ) {}

  async create(data: Partial<DomainModel>): Promise<{ id: string }> {
    return { id: (await this.model.create(data)).id }
  }

  async findAll(): Promise<DomainModel[]> {
    return this.mapper.toDomainArray(await this.model.find().exec())
  }

  async findById(id: string): Promise<DomainModel> {
    return this.mapper.toDomain(await this.model.findById(id).exec())
  }

  async updateById(
    id: string,
    updateData: Partial<DomainModel>,
  ): Promise<DomainModel> {
    await this.model.updateOne({ _id: id }, [updateData])
    return this.mapper.toDomain(await this.model.findById(id).exec())
  }

  async deleteById(id: string): Promise<void> {
    this.model.findByIdAndDelete(id).exec()
  }

  async deleteAll(): Promise<void> {
    this.model.deleteMany({})
  }

  async findByParam<ParamType>(param: ParamType) {
    return this.mapper.toDomainArray(await this.model.find(param).exec())
  }
}
