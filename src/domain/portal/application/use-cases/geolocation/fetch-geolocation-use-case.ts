import { Either, left, right } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"

type FetchGeolocationUseCaseResponse = Either<
  GeolocationNotFound | ProfileActionNotAllowed,
  any
>

export class FetchGeolocationUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(profileId: string): Promise<FetchGeolocationUseCaseResponse> {
    const result = await this.geolocationRepository.findByParam<{
      profileId: string
    }>({ profileId })
    if (!result) return left(new GeolocationNotFound())
    return right({ geolocation: result })
  }
}
