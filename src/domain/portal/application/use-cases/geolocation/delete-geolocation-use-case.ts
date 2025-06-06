import { Either, left } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"

type DeleteGeolocationUseCaseUseCaseResponse = Either<
  GeolocationNotFound | ProfileActionNotAllowed,
  void
>

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
