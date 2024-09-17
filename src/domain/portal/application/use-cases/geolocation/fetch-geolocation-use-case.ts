import { Either, left, right } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { GeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { Geolocation } from "src/domain/portal/enterprise/geolocation/geolocation"

type FetchGeolocationUseCaseResponse = Either<
  GeolocationNotFound,
  { geolocation: Geolocation }
>

export class FetchGeolocationUseCase {
  constructor(private geolocationRepository: GeolocationRepository) {}

  async execute(mapRadiusId: number): Promise<FetchGeolocationUseCaseResponse> {
    const result = await this.geolocationRepository.fetchById(mapRadiusId)
    if (!result) return left(new GeolocationNotFound())
    return right({ geolocation: result })
  }
}
