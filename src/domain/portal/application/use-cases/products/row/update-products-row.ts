import { Product } from "@/domain/portal/enterprise/products/product"
import { Either, left, right } from "@/core/Either"
import { ActionNotAllowedError } from "../../../errors/repair/solicitations/ActionNotAllowed"
import { NotFoundException } from "@nestjs/common"
import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"

export class UpdateProductsRowUseCase {
  constructor(private productsRowRepository: IProductsRowRepository) {}

  async execute(
    storeProfileId: string,
    productRowId: string,
    data: Partial<Product>,
  ): Promise<Either<NotFoundException | ActionNotAllowedError, ProductsRow>> {
    const productsRow = await this.productsRowRepository.findById(productRowId)
    if (!productsRow)
      return left(new NotFoundException("Produto não encontrado"))
    if (productsRow.storeProfileId !== storeProfileId)
      return left(new ActionNotAllowedError())
    const result = await this.productsRowRepository.updateById(productRowId, {
      storeProfileId,
      ...data,
    })

    return right(result)
  }
}
