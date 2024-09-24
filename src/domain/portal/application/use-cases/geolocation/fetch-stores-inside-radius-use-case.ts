import { GeolocationRepository } from "../../repositories/geolocation/geolocation-repository"

export class FetchStoresInsideRadiusUseCase {
  constructor(private geolocationRepository: GeolocationRepository) {}

  async execute({
    latitude,
    longitude,
    radius,
  }: {
    latitude: string
    longitude: string
    radius: string
  }) {
    const result = await this.geolocationRepository.fetchStoresInsideRadius(
      latitude,
      longitude,
      radius,
    )
    return result
  }
}
