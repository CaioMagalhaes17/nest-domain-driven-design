import { Either, left, right } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { GeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { Geolocation } from "src/domain/portal/enterprise/geolocation/geolocation"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"

type FetchGeolocationUseCaseResponse = Either<
  GeolocationNotFound | ProfileActionNotAllowed,
  { geolocation: Geolocation }
>

export class FetchGeolocationUseCase {
  constructor(private geolocationRepository: GeolocationRepository) {}

  async execute(
    mapRadiusId: number,
    isStore: boolean,
  ): Promise<FetchGeolocationUseCaseResponse> {
    if (isStore) return left(new ProfileActionNotAllowed())
    const result = await this.geolocationRepository.fetchById(mapRadiusId)
    if (!result) return left(new GeolocationNotFound())
    return right({ geolocation: result })
  }
}
