import { Either, left } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type DeleteGeolocationUseCaseUseCaseResponse = Either<GeolocationNotFound, void>

export class DeleteGeolocationUseCase {
  constructor(private mapRadiusRepository) {}

  async execute(
    mapRadiusId: number,
  ): Promise<DeleteGeolocationUseCaseUseCaseResponse> {
    const mapRadius = await this.mapRadiusRepository.fetchById(mapRadiusId)
    if (!mapRadius) return left(new GeolocationNotFound())
    await this.mapRadiusRepository.delete(mapRadiusId)
  }
}
