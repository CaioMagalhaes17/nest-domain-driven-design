import { Either, left, right } from "@/core/Either"
import { IProductRepository } from "../../../repositories/products/product-repository"
import { Product } from "@/domain/portal/enterprise/products/product"
import { FetchStoresInsideClientRadiusUseCase } from "../../geolocation/fetch-stores-inside-client-radius-use-case"
import { GeolocationNotFound } from "../../../errors/geolocation/geolocation-not-found"
import { EmptyStoresInsideClientGeolocation } from "../../../errors/geolocation/empty-stores-inside-client-geolocation"

export class FetchProductsByCategoryUseCase {
  constructor(
    private productRepository: IProductRepository,
    private fetchStoreInsideClientRadius: FetchStoresInsideClientRadiusUseCase,
  ) {}

  async execute(
    category: string,
    clientProfileId: string,
  ): Promise<
    Either<GeolocationNotFound | EmptyStoresInsideClientGeolocation, Product[]>
  > {
    const stores =
      await this.fetchStoreInsideClientRadius.execute(clientProfileId)
    if (stores.isLeft()) {
      return left(new GeolocationNotFound())
    }
    if (stores.value.length === 0)
      return left(new EmptyStoresInsideClientGeolocation())
    const nearProducts = await Promise.all(
      stores.value.map(async (store) => {
        const products = await this.productRepository.findByParam<{
          category: string
          storeProfileId: string
          isActive: boolean
        }>({ category, storeProfileId: store.Profile.id, isActive: true })
        if (products.length > 0) return products
      }),
    )
    return right(nearProducts.filter(Boolean).flat())
  }
}
