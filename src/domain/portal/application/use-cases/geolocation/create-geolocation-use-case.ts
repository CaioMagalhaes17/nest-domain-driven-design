import { Either, left, right } from "src/core/Either"
import { ProfileActionNotAllowed } from "../../errors/profile/ProfileActionNotAllowed"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationIncorrectValues } from "../../errors/geolocation/incorrect-geolocation"

type CreateGeolocationUseCaseResponse = Either<
  ProfileActionNotAllowed | GeolocationIncorrectValues,
  string
>

export interface MapRadiusPayload {
  latitude: number
  longitude: number
  radius?: number
}

export class CreateGeolocationUseCase {
  constructor(private geoLocationRepository: IGeolocationRepository) {}

  async execute(
    mapRadiusPayload: MapRadiusPayload,
    profileId: string,
  ): Promise<CreateGeolocationUseCaseResponse> {
    if (
      mapRadiusPayload.longitude < -180 ||
      mapRadiusPayload.longitude > 180 ||
      mapRadiusPayload.latitude < -90 ||
      mapRadiusPayload.latitude > 90
    ) {
      return left(new GeolocationIncorrectValues())
    }
    const newGeoLocation = await this.geoLocationRepository.create({
      latitude: mapRadiusPayload.latitude,
      longitude: mapRadiusPayload.longitude,
      profileId: profileId,
      radius: mapRadiusPayload.radius ? mapRadiusPayload.radius : 0,
    })

    return right(newGeoLocation.id)
  }
}
