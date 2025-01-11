import { Either, left, right } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

type FetchClientsInsideStoreLocationUseCaseResponse = Either<
  GeolocationNotFound,
  [
    {
      _id: string
      location: {
        coordinates: number[]
      }
      radius: number
      userId: string
      distance: number
    },
  ]
>
export class FetchClientsInsideStoreLocationUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(
    userId: string,
  ): Promise<FetchClientsInsideStoreLocationUseCaseResponse> {
    const result = await this.geolocationRepository.findByParam<{
      userId: string
    }>({ userId })
    if (!result) return left(new GeolocationNotFound())
    const clients = await this.geolocationRepository.findRadius(
      result[0].latitude,
      result[0].longitude,
    )

    return right(
      clients.filter((item: { userId: string }) => item.userId !== userId),
    )
  }
}
