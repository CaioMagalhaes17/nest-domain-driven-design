import { left } from "@/core/Either"
import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"
import { GeolocationNotFound } from "../../errors/geolocation/geolocation-not-found"

export class FetchClientsInsideStoreLocationUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(userId: string) {
    const result = await this.geolocationRepository.findByParam<{
      userId: string
    }>({ userId })
    if (!result) return left(new GeolocationNotFound())
    const clients = await this.geolocationRepository.findRadius(
      result[0].latitude,
      result[0].longitude,
    )

    return clients.filter((item: { userId: string }) => item.userId !== userId)
  }
}
