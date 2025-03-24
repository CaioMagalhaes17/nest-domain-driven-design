import { Either, left, right } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { FetchStoreProfileByIdUseCase } from "../profile/store/fetch-store-by-id"

type FetchStoresInsideClientRadiusResponse = Either<GeolocationNotFound, any>

export class FetchStoresInsideClientRadiusUseCase {
  constructor(
    private geolocationRepository: IGeolocationRepository,
    private fetchStoreUseCase: FetchStoreProfileByIdUseCase,
  ) {}

  async execute(
    clientProfileId: string,
  ): Promise<FetchStoresInsideClientRadiusResponse> {
    const result = await this.geolocationRepository.findByParam<{
      profileId: string
    }>({ profileId: clientProfileId })
    if (!result || result.length === 0) return left(new GeolocationNotFound())
    const stores = await this.geolocationRepository.findWithinRadius(
      result[0].latitude,
      result[0].longitude,
      result[0].radius,
    )
    if (stores.length > 0) {
      const filtered = stores.filter(
        (item: { profileId: string; radius: number }) =>
          item.profileId !== clientProfileId &&
          (item.radius === 0 || !item.radius),
      )

      const transformedArray = await Promise.all(
        filtered.map(async (item) => {
          const profile = await this.fetchStoreUseCase.execute(
            item.profileId,
            clientProfileId,
          )
          if (profile.isRight()) {
            console.log(profile.value.distance)
            return profile.value
          }
        }),
      )
      return right(transformedArray)
    }
  }
}
