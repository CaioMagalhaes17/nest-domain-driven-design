import { Either, left, right } from "@/core/Either"
import { ActionNotAllowedError } from "../../../errors/repair/solicitations/ActionNotAllowed"
import { NotFoundException } from "@nestjs/common"
import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"

export class DeleteProductsRowUseCase {
  constructor(private productsRowRepository: IProductsRowRepository) {}

  async execute(
    storeProfileId: string,
    productsRowId: string,
  ): Promise<Either<NotFoundException | ActionNotAllowedError, void>> {
    const productsRow = await this.productsRowRepository.findById(productsRowId)
    if (!productsRow)
      return left(
        new NotFoundException("Prateleira de produtos não encontrada"),
      )
    if (productsRow.storeProfileId !== storeProfileId)
      return left(new ActionNotAllowedError())
    const result = await this.productsRowRepository.deleteById(productsRowId)

    return right(result)
  }
}
