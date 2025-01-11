import { Either, left, right } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"

type FetchStoresInsideClientRadiusResponse = Either<
  GeolocationNotFound,
  Geolocation[]
>

export class FetchStoresInsideClientRadiusUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(
    userId: string,
  ): Promise<FetchStoresInsideClientRadiusResponse> {
    const result = await this.geolocationRepository.findByParam<{
      userId: string
    }>({ userId })
    if (!result) return left(new GeolocationNotFound())
    const stores = await this.geolocationRepository.findWithinRadius(
      result[0].latitude,
      result[0].longitude,
      result[0].radius,
    )
    return right(
      stores.filter((item: { userId: string }) => item.userId !== userId),
    )
  }
}
