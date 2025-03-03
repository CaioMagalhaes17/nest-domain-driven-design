import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Model } from "mongoose"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"
import { ProductsRow as MongoProductsRow } from "../../schemas/products/row.schema"
import { ProductsRowMapper } from "../../mappers/products/products-row.mapper"

export class InfraProductsRowRepository extends BaseInfraRepository<
  MongoProductsRow,
  ProductsRow
> {
  constructor(
    protected readonly model: Model<MongoProductsRow>,
    protected readonly mapper: ProductsRowMapper,
  ) {
    super(model, mapper)
  }
}
