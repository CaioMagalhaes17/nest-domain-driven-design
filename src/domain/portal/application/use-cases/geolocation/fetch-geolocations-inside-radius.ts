import { Either, left, right } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"
import { GeolocationIncorrectValues } from "../../errors/geolocation/incorrect-geolocation"

type FetchGeolocationInsideRadiusUseCaseResponse = Either<
  GeolocationNotFound | GeolocationIncorrectValues,
  any
>

export class FetchGeolocationInsideRadiusUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<FetchGeolocationInsideRadiusUseCaseResponse> {
    if (
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      return left(new GeolocationIncorrectValues())
    }
    const geolocations = await this.geolocationRepository.findWithinRadius(
      latitude,
      longitude,
      radius,
    )
    if (!geolocations || geolocations.length === 0)
      return left(new GeolocationNotFound())

    const filtered = geolocations.filter((item) => item.radius === 0)
    console.log(filtered)
    return right(filtered)
  }
}
