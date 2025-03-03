import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"

export interface IProductsRowRepository
  extends BaseDomainRepository<ProductsRow> {}
