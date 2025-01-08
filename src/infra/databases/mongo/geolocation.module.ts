import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { GeolocationMapper } from "./mappers/geolocation/geolocation.mapper"
import {
  GeolocationSchema,
  Geolocation,
} from "./schemas/geolocation/geolocation.schema"
import { InfraGeolocationRepository } from "./repositories/geolocation/geolocation.repository"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Geolocation.name, schema: GeolocationSchema },
    ]),
  ],
  providers: [
    GeolocationMapper,
    {
      provide: InfraGeolocationRepository,
      useFactory: (model: Model<Geolocation>, mapper: GeolocationMapper) => {
        return new InfraGeolocationRepository(model, mapper)
      },
      inject: [getModelToken(Geolocation.name), GeolocationMapper],
    },
  ],
  exports: [InfraGeolocationRepository],
})
export class GeolocationMongoModule {}
