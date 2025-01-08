import { Either, left } from "src/core/Either"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationIncorrectValues } from "../../errors/geolocation/incorrect-geolocation"

type EditGeolocationUseCaseResponse = Either<
  GeolocationNotFound | ProfileActionNotAllowed,
  void
>

export class EditGeolocationUseCase {
  constructor(private mapRadiusRepository: IGeolocationRepository) {}

  async execute(
    mapRadiusId: string,
    mapRadiusPayload,
  ): Promise<EditGeolocationUseCaseResponse> {
    if (
      mapRadiusPayload.longitude < -180 ||
      mapRadiusPayload.longitude > 180 ||
      mapRadiusPayload.latitude < -90 ||
      mapRadiusPayload.latitude > 90
    ) {
      return left(new GeolocationIncorrectValues())
    }
    const mapRadius = await this.mapRadiusRepository.findById(mapRadiusId)
    if (!mapRadius) return left(new GeolocationNotFound())
    await this.mapRadiusRepository.updateById(mapRadiusId, mapRadiusPayload)
  }
}
