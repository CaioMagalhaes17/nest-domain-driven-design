import { BaseMapper } from "@/core/infra/base.mapper"
import { Geolocation as MongoGeolocation } from "../../schemas/geolocation/geolocation.schema"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"

export class GeolocationMapper
  implements BaseMapper<MongoGeolocation, Geolocation> {
  toDomain(row: MongoGeolocation): Geolocation {
    if (!row) return
    const { _id } = row.toObject()
    return Geolocation.create(
      {
        latitude: row.location.coordinates[1],
        longitude: row.location.coordinates[0],
        radius: row.radius,
        userId: row.userId,
      },
      _id,
    )
  }

  toDomainArray(rows: MongoGeolocation[]): Geolocation[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }
}
