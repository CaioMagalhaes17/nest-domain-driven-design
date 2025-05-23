import { Either, left, right } from "src/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationIncorrectValues } from "../../errors/geolocation/incorrect-geolocation"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"

type EditGeolocationUseCaseResponse = Either<
  GeolocationIncorrectValues,
  Geolocation
>

export class EditGeolocationUseCase {
  constructor(private mapRadiusRepository: IGeolocationRepository) {}

  async execute(
    profileId: string,
    mapRadiusPayload: { longitude: number; latitude: number; radius?: number },
  ): Promise<EditGeolocationUseCaseResponse> {
    if (
      mapRadiusPayload.longitude < -180 ||
      mapRadiusPayload.longitude > 180 ||
      mapRadiusPayload.latitude < -90 ||
      mapRadiusPayload.latitude > 90
    ) {
      return left(new GeolocationIncorrectValues())
    }

    const mapRadius = await this.mapRadiusRepository.findByParam<{
      profileId
    }>({ profileId })
    if (!mapRadius || mapRadius.length === 0) {
      const newId = await this.mapRadiusRepository.create({
        latitude: mapRadiusPayload.latitude,
        longitude: mapRadiusPayload.longitude,
        radius: mapRadiusPayload.radius,
        profileId,
      })

      const geolocation = await this.mapRadiusRepository.findById(newId.id)
      return right(geolocation)
    }
    return right(
      await this.mapRadiusRepository.updateById(
        mapRadius[0].id,
        mapRadiusPayload,
      ),
    )
  }
}
