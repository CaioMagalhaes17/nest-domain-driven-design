import { Model } from "mongoose"
import { BaseInfraRepository } from "@/core/infra/base.repository"
import { Geolocation as MongoGeolocation } from "../../schemas/geolocation/geolocation.schema"
import { Geolocation } from "@/domain/portal/enterprise/geolocation/geolocation"
import { GeolocationMapper } from "../../mappers/geolocation/geolocation.mapper"

export class InfraGeolocationRepository extends BaseInfraRepository<
  MongoGeolocation,
  Geolocation
> {
  constructor(
    protected readonly model: Model<MongoGeolocation>,
    protected readonly mapper: GeolocationMapper,
  ) {
    super(model, mapper)
  }

  async create(data: Geolocation) {
    const dataToInsert = {
      location: {
        type: "Point",
        coordinates: [data.longitude, data.latitude],
      },
      radius: data.radius,
      profileId: data.profileId,
    }

    return { id: (await this.model.create(dataToInsert)).id }
  }

  async findWithinRadius(latitude: number, longitude: number, radius: number) {
    const result = await this.model.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "distance",
          spherical: true,
          maxDistance: radius, // Raio em metros
        },
      },
    ])
    return this.mapper.toDomainArray(result)
  }

  async findRadius(latitude: number, longitude: number) {
    return this.model.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] }, // Ponto de consulta
          distanceField: "distance", // Nome do campo onde será armazenada a distância calculada
          spherical: true, // Habilita cálculos esféricos
        },
      },
      {
        $match: {
          $expr: { $lte: ["$distance", "$radius"] }, // Filtra registros onde a distância <= radius
        },
      },
    ])
  }

  async updateById(id: string, updateData: Geolocation): Promise<Geolocation> {
    const updateDataInfra = {
      radius: updateData.radius,
      location: {
        type: "Point",
        coordinates: [updateData.longitude, updateData.latitude],
      },
    }
    await this.model.findByIdAndUpdate(id, updateDataInfra)
    return this.mapper.toDomain(await this.model.findById(id).exec())
  }
}
