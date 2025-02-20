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
import { StoreContactsMapper } from "./mappers/profiles/store-contacts"
import { StoreSocialsMapper } from "./mappers/profiles/store-socials.mapper"
import {
  StoreContacts,
  StoreContactsSchema,
} from "./schemas/profiles/store-contacts.schema"
import {
  StoreSocials,
  StoreSocialsSchema,
} from "./schemas/profiles/store-socials.schema"
import { InfraStoreSocialsRepository } from "./repositories/profiles/store-socials.repository"
import { InfraStoreContactsRepository } from "./repositories/profiles/store-contacts.repository"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientProfile.name, schema: ClientProfileSchema },
    ]),
    MongooseModule.forFeature([
      { name: StoreProfile.name, schema: StoreProfileSchema },
    ]),
    MongooseModule.forFeature([
      { name: StoreContacts.name, schema: StoreContactsSchema },
    ]),
    MongooseModule.forFeature([
      { name: StoreSocials.name, schema: StoreSocialsSchema },
    ]),
  ],
  providers: [
    ClientProfileMapper,
    StoreProfileMapper,
    StoreContactsMapper,
    StoreSocialsMapper,
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
    {
      provide: InfraStoreSocialsRepository,
      useFactory: (model: Model<StoreSocials>, mapper: StoreSocialsMapper) => {
        return new InfraStoreSocialsRepository(model, mapper)
      },
      inject: [getModelToken(StoreSocials.name), StoreSocialsMapper],
    },
    {
      provide: InfraStoreContactsRepository,
      useFactory: (
        model: Model<StoreContacts>,
        mapper: StoreContactsMapper,
      ) => {
        return new InfraStoreContactsRepository(model, mapper)
      },
      inject: [getModelToken(StoreContacts.name), StoreContactsMapper],
    },
  ],
  exports: [
    InfraClientProfileRepository,
    InfraStoreProfileRepository,
    InfraStoreContactsRepository,
    InfraStoreSocialsRepository,
  ],
})
export class ProfilesMongoModule {}
