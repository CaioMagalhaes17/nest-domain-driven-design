import { GeolocationRepository } from "src/domain/portal/application/repositories/geolocation/geolocation-repository"
import { Geolocation as SequelizeGeolocation } from "../../model/geolocation/geolocation"
import { GeolocationMapper } from "../../mappers/geolocation/geolocation-mapper"

export class SequelizeGeolocationRepository extends GeolocationRepository {
  async fetchById(mapRadiusId: number) {
    const result = await SequelizeGeolocation.findByPk(mapRadiusId)
    if (result) return GeolocationMapper.toDomain(result)
  }

  async delete(mapRadiusId: number) {
    await SequelizeGeolocation.destroy({
      where: { id: mapRadiusId },
    })
  }

  async create(mapRadiusPayload: any) {
    const result = await SequelizeGeolocation.create(mapRadiusPayload)
    return result.id
  }

  async edit(mapRadiusId: number, mapRadiusPayload: any) {
    await SequelizeGeolocation.update(mapRadiusPayload, {
      where: { id: mapRadiusId },
    })
  }
}
