import { Product } from "@/domain/portal/enterprise/products/product"
import { IProductRepository } from "../../../repositories/products/product-repository"

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(storeProfileId: string, data: Partial<Product>) {
    const result = await this.productRepository.create({
      storeProfileId,
      ...data,
    })

    return result
  }
}
