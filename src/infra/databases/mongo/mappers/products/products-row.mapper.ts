import { BaseMapper } from "@/core/infra/base.mapper"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"
import { ProductsRow as MongoProductsRow } from "../../schemas/products/row.schema"

export class ProductsRowMapper
  implements BaseMapper<MongoProductsRow, ProductsRow> {
  toDomain(row: MongoProductsRow): ProductsRow {
    if (!row) return
    const { _id, ...rest } = row.toObject()
    return ProductsRow.create(
      {
        ...rest,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoProductsRow[]): ProductsRow[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
