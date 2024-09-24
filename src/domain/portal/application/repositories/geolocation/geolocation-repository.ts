import { Geolocation } from "src/domain/portal/enterprise/geolocation/geolocation"
import { MapRadiusPayload } from "../../use-cases/geolocation/create-geolocation-use-case"

export interface GeoLocationRepositoryInterface extends MapRadiusPayload {
  typeProfile: string
  userId: number
}

export abstract class GeolocationRepository {
  abstract fetchById(mapRadiusId: number): Promise<Geolocation>
  abstract fetchByUserId(userId: number): Promise<Geolocation>
  abstract delete(mapRadiusId: number)
  abstract create(mapRadiusPayload: GeoLocationRepositoryInterface)
  abstract edit(mapRadiusId: number, mapRadiusPayload)
  abstract fetchGeolocationCoveringStore(latitude: string, longitude: string)
  abstract fetchStoresInsideRadius(
    latitude: string,
    longitude: string,
    radius: string,
  )
}
