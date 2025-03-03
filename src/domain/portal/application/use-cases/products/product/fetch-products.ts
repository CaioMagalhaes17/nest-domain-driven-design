import { Either, right } from "@/core/Either"
import { IProductRepository } from "../../../repositories/products/product-repository"
import { Product } from "@/domain/portal/enterprise/products/product"

export class FetchProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(storeProfileId: string): Promise<Either<null, Product[]>> {
    const product = await this.productRepository.findByParam<{
      storeProfileId: string
    }>({ storeProfileId })

    return right(product)
  }
}
