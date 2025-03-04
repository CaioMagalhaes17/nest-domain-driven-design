import { Either, right } from "@/core/Either"
import { IProductRepository } from "../../../repositories/products/product-repository"
import { Product } from "@/domain/portal/enterprise/products/product"

export class FetchProductsByRowUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    rowId: string,
    isActive?: boolean | null,
  ): Promise<Either<null, Product[]>> {
    if (isActive === true) {
      const product = await this.productRepository.findByParam<{
        rowId: string
        isActive: boolean
      }>({ rowId, isActive })
      return right(product)
    }

    const product = await this.productRepository.findByParam<{
      rowId: string
    }>({ rowId })
    return right(product)
  }
}
