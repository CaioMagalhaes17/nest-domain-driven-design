import { Geolocation } from "src/domain/portal/enterprise/geolocation/geolocation"
import { Geolocation as SequelizeGeolocation } from "../../model/geolocation/geolocation"

export class GeolocationMapper {
  static toDomain(row: SequelizeGeolocation): Geolocation {
    return Geolocation.create(
      {
        latitude: row.latitude,
        longitude: row.longitude,
        radius: row.radius,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
      row.id,
    )
  }
}
