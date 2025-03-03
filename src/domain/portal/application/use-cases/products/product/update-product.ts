import { Product } from "@/domain/portal/enterprise/products/product"
import { IProductRepository } from "../../../repositories/products/product-repository"
import { Either, left, right } from "@/core/Either"
import { ActionNotAllowedError } from "../../../errors/repair/solicitations/ActionNotAllowed"
import { NotFoundException } from "@nestjs/common"

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    storeProfileId: string,
    productId: string,
    data: Partial<Product>,
  ): Promise<Either<NotFoundException | ActionNotAllowedError, Product>> {
    const product = await this.productRepository.findById(productId)
    if (!product) return left(new NotFoundException("Produto não encontrado"))
    if (product.storeProfileId !== storeProfileId)
      return left(new ActionNotAllowedError())
    const result = await this.productRepository.updateById(productId, {
      storeProfileId,
      ...data,
    })

    return right(result)
  }
}
