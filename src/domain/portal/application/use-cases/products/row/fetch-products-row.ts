import { Either, left, right } from "@/core/Either"
import { NotFoundError } from "rxjs"
import { NotFoundException } from "@nestjs/common"
import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"
import { FetchProductsByRowUseCase } from "../product/fetch-products-by-row"

export class FetchProductsRowUseCase {
  constructor(
    private productsRowRepository: IProductsRowRepository,
    private fetchProductsByRowUseCase: FetchProductsByRowUseCase,
  ) {}

  async execute(productRowId: string): Promise<Either<NotFoundError, any>> {
    const productsRow = await this.productsRowRepository.findById(productRowId)
    if (!productsRow.isActive) return right(null)
    if (!productsRow)
      return left(new NotFoundException("Prateleira não encontrada"))
    const products = await this.fetchProductsByRowUseCase.execute(productRowId)
    return right({
      id: productsRow.id,
      storeProfileId: productsRow.storeProfileId,
      name: productsRow.name,
      isActive: productsRow.isActive,
      createdAt: productsRow.createdAt,
      updatedAt: productsRow.updatedAt,
      products: products.value,
    })
  }
}
