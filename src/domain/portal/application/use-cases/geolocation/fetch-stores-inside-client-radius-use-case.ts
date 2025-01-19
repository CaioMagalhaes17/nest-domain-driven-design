import { Either, left, right } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { FetchStoreProfileUseCase } from "../profile/store/fetch-store-profile"

type FetchStoresInsideClientRadiusResponse = Either<GeolocationNotFound, any>

export class FetchStoresInsideClientRadiusUseCase {
  constructor(
    private geolocationRepository: IGeolocationRepository,
    private fetchStoreUseCase: FetchStoreProfileUseCase,
  ) {}

  async execute(
    clientProfileId: string,
  ): Promise<FetchStoresInsideClientRadiusResponse> {
    const result = await this.geolocationRepository.findByParam<{
      profileId: string
    }>({ profileId: clientProfileId })
    if (!result) return left(new GeolocationNotFound())
    const stores = await this.geolocationRepository.findWithinRadius(
      result[0].latitude,
      result[0].longitude,
      result[0].radius,
    )

    if (stores.length > 0) {
      const filtered = stores.filter(
        (item: { profileId: string }) => item.profileId !== clientProfileId,
      )

      const transformedArray = await Promise.all(
        filtered.map(async (item) => {
          const profile = await this.fetchStoreUseCase.execute(item.profileId)
          if (profile.isRight()) {
            return {
              GeoLocation: item,
              Profile: profile.value.profile,
            }
          }
        }),
      )
      return right(transformedArray)
    }
  }
}
