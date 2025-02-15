import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Feedback } from "@/domain/portal/enterprise/feedback/feedback"
import { Model } from "mongoose"
import { Feedback as MongoFeedback } from "../../schemas/feedback/feedback-schema"
import { FeedbackMapper } from "../../mappers/feedback/feedback-mapper"

export class InfraFeedbackRepository extends BaseInfraRepository<
  MongoFeedback,
  Feedback
> {
  constructor(
    protected readonly model: Model<MongoFeedback>,
    protected readonly mapper: FeedbackMapper,
  ) {
    super(model, mapper)
  }

  async findByParam<ParamType>(
    param: ParamType,
    paginateObj?: { page: number; limit: number },
  ) {
    if (paginateObj) {
      const teste = await this.findAllPaginated<ParamType>(
        paginateObj.page,
        paginateObj.limit,
        param,
      )
      return this.mapper.toDomainArray(teste.data)
    }
    return this.mapper.toDomainArray(
      await this.model
        .find(param)
        .populate(["storeProfileId", "clientProfileId"])
        .sort({ createdAt: -1 })
        .exec(),
    )
  }

  async findById(id: string): Promise<any> {
    try {
      return this.mapper.toDomain(
        await this.model
          .findById(id)
          .populate(["storeProfileId", "clientProfileId"])
          .exec(),
      )
    } catch (error) {
      return
    }
  }

  async findAllPaginated<T = unknown>(page: number, limit: number, param?: T) {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      this.model
        .find(param)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate(["storeProfileId", "clientProfileId"])
        .exec(),
      this.model.countDocuments().exec(),
    ])

    return {
      data,
      total,
      page,
      pages: Math.ceil(total / limit),
    }
  }
}
