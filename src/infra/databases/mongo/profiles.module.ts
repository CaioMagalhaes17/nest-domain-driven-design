import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { InfraClientProfileRepository } from "./repositories/profiles/client.repository"
import {
  ClientProfile,
  ClientProfileSchema,
} from "./schemas/profiles/client.schema"
import { ClientProfileMapper } from "./mappers/profiles/client.mapper"
import { StoreProfileMapper } from "./mappers/profiles/stores.mapper"
import { InfraStoreProfileRepository } from "./repositories/profiles/store.repository"
import {
  StoreProfile,
  StoreProfileSchema,
} from "./schemas/profiles/store.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientProfile.name, schema: ClientProfileSchema },
    ]),
    MongooseModule.forFeature([
      { name: StoreProfile.name, schema: StoreProfileSchema },
    ]),
  ],
  providers: [
    ClientProfileMapper,
    StoreProfileMapper,
    {
      provide: InfraClientProfileRepository,
      useFactory: (
        model: Model<ClientProfile>,
        mapper: ClientProfileMapper,
      ) => {
        return new InfraClientProfileRepository(model, mapper)
      },
      inject: [getModelToken(ClientProfile.name), ClientProfileMapper],
    },
    {
      provide: InfraStoreProfileRepository,
      useFactory: (model: Model<StoreProfile>, mapper: StoreProfileMapper) => {
        return new InfraStoreProfileRepository(model, mapper)
      },
      inject: [getModelToken(StoreProfile.name), StoreProfileMapper],
    },
  ],
  exports: [InfraClientProfileRepository, InfraStoreProfileRepository],
})
export class ProfilesMongoModule {}
