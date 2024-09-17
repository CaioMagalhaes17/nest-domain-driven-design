import { Either, left } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type EditGeolocationUseCaseResponse = Either<GeolocationNotFound, void>

export class EditGeolocationUseCase {
  constructor(private mapRadiusRepository) {}

  async execute(
    mapRadiusId: number,
    mapRadiusPayload,
  ): Promise<EditGeolocationUseCaseResponse> {
    const mapRadius = await this.mapRadiusRepository.fetchById(mapRadiusId)
    if (!mapRadius) return left(new GeolocationNotFound())
    await this.mapRadiusRepository.edit(mapRadiusId, mapRadiusPayload)
  }
}
