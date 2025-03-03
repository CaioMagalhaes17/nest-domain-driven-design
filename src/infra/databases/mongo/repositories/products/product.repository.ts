import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Model } from "mongoose"
import { Product } from "@/domain/portal/enterprise/products/product"
import { Product as MongoProduct } from "../../schemas/products/product.schema"
import { ProductMapper } from "../../mappers/products/product.mapper"

export class InfraProductRepository extends BaseInfraRepository<
  MongoProduct,
  Product
> {
  constructor(
    protected readonly model: Model<MongoProduct>,
    protected readonly mapper: ProductMapper,
  ) {
    super(model, mapper)
  }
}
