import { Sequelize } from "sequelize-typescript"
import { Module } from "@nestjs/common"
import { GeolocationRepository } from "src/domain/portal/application/repositories/geolocation/geolocation-repository"
import { SequelizeGeolocationRepository } from "./sequelize/repositories/geolocation/geolocation-repository"

@Module({
  providers: [
    {
      provide: GeolocationRepository,
      useFactory: () => {
        return new SequelizeGeolocationRepository()
      },
      inject: [Sequelize],
    },
  ],
  exports: [GeolocationRepository],
})
export class GeolocationDatabaseModule {}
