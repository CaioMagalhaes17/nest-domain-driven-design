import { BaseDomainRepository } from "@/core/domain/base.repository.interface"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"

export interface IGeolocationRepository
  extends BaseDomainRepository<Geolocation> {
  fetchGeolocationCoveringStore(
    latitude: number,
    longitude: number,
  ): Promise<Geolocation[]>
  findWithinRadius(
    latidude: number,
    longitude: number,
    radius: number,
  ): Promise<Geolocation[]>
  findRadius(latidude: number, longitude: number)
}
