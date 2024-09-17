import { Geolocation } from "src/domain/portal/enterprise/geolocation/geolocation"

export abstract class GeolocationRepository {
  abstract fetchById(mapRadiusId: number): Promise<Geolocation>
  abstract delete(mapRadiusId: number)
  abstract create(mapRadiusPayload)
  abstract edit(mapRadiusId: number, mapRadiusPayload)
}
