import { Either, right } from "@/core/Either"
import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"

export class FetchProductsRowsUseCase {
  constructor(private productsRowRepository: IProductsRowRepository) {}

  async execute(storeProfileId: string): Promise<Either<null, ProductsRow[]>> {
    const product = await this.productsRowRepository.findByParam<{
      storeProfileId: string
    }>({ storeProfileId })

    return right(product)
  }
}
