import { Either, left } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"

type EditGeolocationUseCaseResponse = Either<
  GeolocationNotFound | ProfileActionNotAllowed,
  void
>

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
