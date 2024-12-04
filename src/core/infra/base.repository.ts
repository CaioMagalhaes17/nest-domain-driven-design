import { Model } from "mongoose"
import { IRepository } from "../domain/base.repository.interface"

export abstract class BaseRepository<T> implements IRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data)
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec()
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id).exec()
  }

  async updateById(id: string, updateData: Partial<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async deleteById(id: string): Promise<void> {
    this.model.findByIdAndDelete(id).exec()
  }

  async deleteAll(): Promise<void> {
    this.model.deleteMany({})
  }

  async findByParam<T>(param: T) {
    return this.model.find({ param }).exec()
  }
}
