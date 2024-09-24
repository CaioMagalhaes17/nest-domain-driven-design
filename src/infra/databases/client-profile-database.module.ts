import { Sequelize } from "sequelize-typescript"
import { Module } from "@nestjs/common"
import { SequelizeClientProfileRepository } from "./sequelize/repositories/profile/client/client-profile.repository"
import { ClientProfileRepository } from "src/domain/portal/application/repositories/profile/client/client-profile.repository"

@Module({
  providers: [
    {
      provide: ClientProfileRepository,
      useFactory: () => {
        return new SequelizeClientProfileRepository()
      },
      inject: [Sequelize],
    },
  ],
  exports: [ClientProfileRepository],
})
export class ClientProfileDatabaseModule {}
