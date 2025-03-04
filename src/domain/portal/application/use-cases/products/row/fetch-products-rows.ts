import { Either, right } from "@/core/Either"
import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"
import { FetchProductsByRowUseCase } from "../product/fetch-products-by-row"

export class FetchProductsRowsUseCase {
  constructor(
    private productsRowRepository: IProductsRowRepository,
    private fetchProductsByRowUseCase: FetchProductsByRowUseCase,
  ) {}

  async execute(
    storeProfileId: string,
    isOwner: boolean,
  ): Promise<Either<null, ProductsRow[] | any>> {
    console.log(isOwner)
    const productsRow = await this.productsRowRepository.findByParam<{
      storeProfileId: string
    }>({ storeProfileId })
    if (productsRow.length > 0) {
      const products = await Promise.all(
        productsRow.map(async (row) => {
          const product = await this.fetchProductsByRowUseCase.execute(
            row.id.toString(),
            !isOwner && true,
          )
          const teste = {
            id: row.id,
            storeProfileId: row.storeProfileId,
            name: row.name,
            isActive: row.isActive,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            products: product.value,
          }
          return teste
        }),
      )
      return right(products)
    }

    return right(productsRow)
  }
}
