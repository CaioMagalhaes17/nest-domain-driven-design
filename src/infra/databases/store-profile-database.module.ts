import { Sequelize } from "sequelize-typescript"
import { Module } from "@nestjs/common"
import { StoreProfileRepository } from "src/domain/portal/application/repositories/profile/store/store-profile.repository"
import { SequelizeStoreProfileRepository } from "./sequelize/repositories/profile/store/store-profile.repository"

@Module({
  providers: [
    {
      provide: StoreProfileRepository,
      useFactory: () => {
        return new SequelizeStoreProfileRepository()
      },
      inject: [Sequelize],
    },
  ],
  exports: [StoreProfileRepository],
})
export class StorerProfileDatabaseModule {}
