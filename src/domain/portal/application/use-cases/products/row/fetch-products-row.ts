import { Either, left, right } from "@/core/Either"
import { NotFoundError } from "rxjs"
import { NotFoundException } from "@nestjs/common"
import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"

export class FetchProductsRowUseCase {
  constructor(private productsRowRepository: IProductsRowRepository) {}

  async execute(
    productId: string,
  ): Promise<Either<NotFoundError, ProductsRow>> {
    const productsRow = await this.productsRowRepository.findById(productId)
    if (!productsRow)
      return left(new NotFoundException("Produto não encontrado"))

    return right(productsRow)
  }
}
