import { IGeolocationRepository } from "../../repositories/geolocation/geolocation-repository"

export class FetchStoreDistanceFromClientUseCase {
  constructor(private geolocationRepository: IGeolocationRepository) {}

  async execute(
    latitude: number,
    longitude: number,
    radius: number,
    storeProfileId: string,
  ): Promise<number> {
    const geolocations = await this.geolocationRepository.findWithinRadius(
      latitude,
      longitude,
      radius,
    )
    const filtered = geolocations.map((item) => {
      if (
        (item.radius === 0 || !item.radius) &&
        storeProfileId === item.profileId
      ) {
        return item.distance
      }
    })
    return filtered.filter(Boolean).flat()[0]
  }
}
