import { Either, left, right } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { GeolocationIncorrectValues } from "../../errors/geolocation/incorrect-geolocation"

type FetchGeolocationCoveringLocationUseCaseResponse = Either<
  GeolocationNotFound | GeolocationIncorrectValues,
  any
>

export class FetchGeolocationCoveringLocationUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(
    latitude: number,
    longitude: number,
  ): Promise<FetchGeolocationCoveringLocationUseCaseResponse> {
    if (
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      return left(new GeolocationIncorrectValues())
    }
    const geolocations = await this.geolocationRepository.findRadius(
      latitude,
      longitude,
    )

    if (!geolocations || geolocations.length === 0)
      return left(new GeolocationNotFound())

    const filtered = geolocations.filter(
      (item) =>
        longitude !== item.location.coordinates[0] &&
        latitude !== item.location.coordinates[1],
    )
    return right(filtered)
  }
}
