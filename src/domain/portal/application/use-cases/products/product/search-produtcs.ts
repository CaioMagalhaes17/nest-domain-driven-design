import { IProductRepository } from "../../../repositories/products/product-repository"

export class SearchProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(query: string) {
    const products = await this.productRepository.search("name", query)
    return products.slice(0, 3)
  }
}
