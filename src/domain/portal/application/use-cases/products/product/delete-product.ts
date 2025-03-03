import { Either, left, right } from "@/core/Either"
import { IProductRepository } from "../../../repositories/products/product-repository"
import { ActionNotAllowedError } from "../../../errors/repair/solicitations/ActionNotAllowed"
import { NotFoundException } from "@nestjs/common"

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    storeProfileId: string,
    productId: string,
  ): Promise<Either<NotFoundException | ActionNotAllowedError, void>> {
    const product = await this.productRepository.findById(productId)
    if (!product) return left(new NotFoundException("Produto não encontrado"))
    if (product.storeProfileId !== storeProfileId)
      return left(new ActionNotAllowedError())
    const result = await this.productRepository.deleteById(productId)

    return right(result)
  }
}
