import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { Product } from "@/domain/portal/enterprise/products/product"

export interface IProductRepository extends BaseDomainRepository<Product> {}
