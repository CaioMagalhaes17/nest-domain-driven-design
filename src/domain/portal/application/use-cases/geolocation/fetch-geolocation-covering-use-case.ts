import { GeolocationRepository } from "../../repositories/geolocation/geolocation-repository"

export class FetchGeolocationCoveringStoreUseCase {
  constructor(private geolocationRepository: GeolocationRepository) {}

  async execute({ latitude, longitude }) {
    const result =
      await this.geolocationRepository.fetchGeolocationCoveringStore(
        latitude,
        longitude,
      )
    return result
  }
}
