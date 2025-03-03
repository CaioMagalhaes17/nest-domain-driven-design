import { BaseMapper } from "@/core/infra/base.mapper"
import { Product } from "@/domain/portal/enterprise/products/product"
import { Product as MongoProduct } from "../../schemas/products/product.schema"

export class ProductMapper implements BaseMapper<MongoProduct, Product> {
  toDomain(row: MongoProduct): Product {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return Product.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoProduct[]): Product[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
