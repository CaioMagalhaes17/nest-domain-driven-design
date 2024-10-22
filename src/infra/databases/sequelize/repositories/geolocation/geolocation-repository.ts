import {
  GeolocationRepository,
  GeoLocationRepositoryInterface,
} from "src/domain/portal/application/repositories/geolocation/geolocation-repository"
import { Geolocation as SequelizeGeolocation } from "../../model/geolocation/geolocation"
import { GeolocationMapper } from "../../mappers/geolocation/geolocation-mapper"
import { QueryTypes } from "sequelize"

export class SequelizeGeolocationRepository extends GeolocationRepository {
  async fetchById(mapRadiusId: number) {
    const result = await SequelizeGeolocation.findByPk(mapRadiusId)
    if (result) return GeolocationMapper.toDomain(result)
  }

  async fetchByUserId(userId: number) {
    const result = await SequelizeGeolocation.findOne({
      where: { fk_id_user: userId },
    })
    if (result) return GeolocationMapper.toDomain(result)
  }

  async fetchGeolocationCoveringStore(
    latitudeLoja: string,
    longitudeLoja: string,
  ) {
    const query = `
      SELECT fk_id_user, 
             (6371 * ACOS(COS(RADIANS(:latitudeLoja)) 
                          * COS(RADIANS(latitude)) 
                          * COS(RADIANS(longitude) - RADIANS(:longitudeLoja)) 
                          + SIN(RADIANS(:latitudeLoja)) 
                          * SIN(RADIANS(latitude)))) AS distancia_km,
             radius
      FROM geo_infos
      WHERE type_profile = 'client'
      HAVING distancia_km <= radius;
    `

    const clientsGeoLocation = await SequelizeGeolocation.sequelize.query(
      query,
      {
        replacements: {
          latitudeLoja: parseFloat(latitudeLoja),
          longitudeLoja: parseFloat(longitudeLoja),
        },
        type: QueryTypes.SELECT, // Define o tipo de consulta como SELECT
      },
    )

    return clientsGeoLocation
  }

  async fetchStoresInsideRadius(
    latitude: string,
    longitude: string,
    radius: string,
  ) {
    const query = `
      SELECT fk_id_user, 
      (6371 * ACOS(COS(RADIANS(:latitude)) 
                 * COS(RADIANS(latitude)) 
                 * COS(RADIANS(longitude) - RADIANS(:longitude)) 
                 + SIN(RADIANS(:latitude)) 
                 * SIN(RADIANS(latitude)))) AS distancia_km
      FROM geo_infos
      WHERE type_profile = 'store'
      HAVING distancia_km <= :radius`

    const stores = await SequelizeGeolocation.sequelize.query(query, {
      replacements: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
      },
      type: QueryTypes.SELECT, // Define o tipo de consulta como SELECT
    })

    const result = stores.map(
      (item: { fk_id_user: number; distancia_km: number }) => {
        return {
          storeId: item.fk_id_user,
          distance: item.distancia_km,
        }
      },
    )
    return result
  }

  async delete(mapRadiusId: number) {
    await SequelizeGeolocation.destroy({
      where: { id: mapRadiusId },
    })
  }

  async create(geoLocationPayload: GeoLocationRepositoryInterface) {
    const result = await SequelizeGeolocation.create({
      type_profile: geoLocationPayload.typeProfile,
      fk_id_user: geoLocationPayload.userId,
      ...geoLocationPayload,
    })
    return result.id
  }

  async edit(mapRadiusId: number, mapRadiusPayload: any) {
    await SequelizeGeolocation.update(mapRadiusPayload, {
      where: { id: mapRadiusId },
    })
  }
}
