import { IProductsRowRepository } from "../../../repositories/products/products-row.repository"
import { ProductsRow } from "@/domain/portal/enterprise/products/products-row"

export class CreateProductsRowUseCase {
  constructor(private productsRowRepository: IProductsRowRepository) {}

  async execute(storeProfileId: string, data: Partial<ProductsRow>) {
    const result = await this.productsRowRepository.create({
      storeProfileId,
      ...data,
    })

    return result
  }
}
