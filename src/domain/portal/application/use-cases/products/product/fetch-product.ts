import { Either, left, right } from "@/core/Either"
import { IProductRepository } from "../../../repositories/products/product-repository"
import { NotFoundError } from "rxjs"
import { Product } from "@/domain/portal/enterprise/products/product"
import { NotFoundException } from "@nestjs/common"

export class FetchProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(productId: string): Promise<Either<NotFoundError, Product>> {
    const product = await this.productRepository.findById(productId)
    if (!product) return left(new NotFoundException("Produto não encontrado"))

    return right(product)
  }
}
