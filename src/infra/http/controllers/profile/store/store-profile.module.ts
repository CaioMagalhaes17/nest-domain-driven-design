import { forwardRef, Module } from "@nestjs/common"
import { CreateStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/create-store-profile"
import { CreateStoreProfileUseCaseController } from "./create-store-profile-use-case.controller"
import { IStoreProfileRepository } from "src/domain/portal/application/repositories/profile/store/store-profile.repository"
import { EditStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/edit-store-profile"
import { DeleteStorreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/delete-store-profile"
import { EditStoreProfileUseCaseController } from "./edit-store-profile-use-case.controller"
import { DeleteStoreProfileUseCaseController } from "./delete-store-prrofile-use-case.controller"
import { FetchStoreProfileUseCase } from "src/domain/portal/application/use-cases/profile/store/fetch-store-profile"
import { FetchStoreProfileUseCaseController } from "./fetch-store-profile-use-case.controller"
import { InfraStoreProfileRepository } from "@/infra/databases/mongo/repositories/profiles/store.repository"
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"
import { SelectProfileUseCase } from "@/domain/portal/application/use-cases/profile/store/select-profile-use-case"
import { SelectProfileUseCaseController } from "./select-profile-use-case.controller"
import { IUserRepository } from "@/domain/portal/application/repositories/user/user-repository.interface"
import { EncrypterGateway } from "@/domain/portal/application/gateways/user/encrypter.gateway"
import { InfraUserRepository } from "@/infra/databases/mongo/repositories/user/user.repository"
import { CryptographyModule } from "@/infra/auth/cryptography/cryptography.module"
import { UserMongoModule } from "@/infra/databases/mongo/user.module"
import { FetchGeolocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { GeolocationModule } from "../../geolocation/geolocation.module"
import { FetchStoreProfileByIdUseCaseController } from "./fetch-store-by-id-use-case.controller"
import { FetchStoreProfileByIdUseCase } from "@/domain/portal/application/use-cases/profile/store/fetch-store-by-id"
import { CreateStoreSocialsUseCaseController } from "./socials/create-store-socials.controller"
import { CreateStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/create-store-socials"
import { IStoreSocialsRepository } from "@/domain/portal/application/repositories/profile/store/store-socials.repository"
import { InfraStoreSocialsRepository } from "@/infra/databases/mongo/repositories/profiles/store-socials.repository"
import { FetchStoreSocialsUseCaseController } from "./socials/fetch-store-socials.controller"
import { FetchStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/fetch-store-socials"
import { UpdateStoreSocialsUseCaseController } from "./socials/update-store-socials.controller"
import { UpdateStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/update-store-socials"
import { DeleteStoreSocialsUseCase } from "@/domain/portal/application/use-cases/profile/store/socials/delete-store-socials"
import { DeleteStoreSocialsUseCaseController } from "./socials/delete-store-socials.controller"
import { CreateStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/create-store-contacts"
import { CreateStoreContactsUseCaseController } from "./contacts/create-store-contacts.controller"
import { FetchStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/fetch-store-contacts"
import { FetchStoreContactsUseCaseController } from "./contacts/fetch-store-contacts.controller"
import { UpdateStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/update-store-contacts"
import { UpdateStoreContactsUseCaseController } from "./contacts/update-store-contacts.controller"
import { DeleteStoreContactsUseCase } from "@/domain/portal/application/use-cases/profile/store/contacts/delete-store-contacts"
import { DeleteStoreContactsUseCaseController } from "./contacts/delete-store-contacts.controller"
import { IStoreContactsRepository } from "@/domain/portal/application/repositories/profile/store/store-contacts.repository"
import { InfraStoreContactsRepository } from "@/infra/databases/mongo/repositories/profiles/store-contacts.repository"
import { UpdateStoreProfileImgUseCaseController } from "./update-store-profile-img-use-case.controller"
import { UpdateStoreProfileImgUseCase } from "@/domain/portal/application/use-cases/profile/store/update-store-profile-img-use-case"
import { ImageResizerGateway } from "@/domain/portal/application/gateways/images/image-resizer.gateway"
import { ImagesModule } from "@/infra/gateways/images/images.module"
import { SearchStoreProfilesUseCase } from "@/domain/portal/application/use-cases/profile/store/search-store-profiles"
import { SearchStoreProfilesUseCaseController } from "./search-store-profile-use-case.controller"
import { FetchStoreDistanceFromClientUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-store-distance-from-client"
import { FetchStoreProfileByUserIdUseCase } from "@/domain/portal/application/use-cases/profile/store/fetch-store-profile-by-user-id"

@Module({
  imports: [
    ProfilesMongoModule,
    CryptographyModule,
    forwardRef(() => GeolocationModule),
    UserMongoModule,
    ImagesModule,
  ],
  controllers: [
    SearchStoreProfilesUseCaseController,
    CreateStoreProfileUseCaseController,
    EditStoreProfileUseCaseController,
    DeleteStoreProfileUseCaseController,
    FetchStoreProfileUseCaseController,
    SelectProfileUseCaseController,
    FetchStoreProfileByIdUseCaseController,
    CreateStoreSocialsUseCaseController,
    FetchStoreSocialsUseCaseController,
    UpdateStoreSocialsUseCaseController,
    DeleteStoreSocialsUseCaseController,
    CreateStoreContactsUseCaseController,
    FetchStoreContactsUseCaseController,
    UpdateStoreContactsUseCaseController,
    DeleteStoreContactsUseCaseController,
    UpdateStoreProfileImgUseCaseController,
  ],
  exports: [
    FetchStoreProfileUseCase,
    FetchStoreContactsUseCase,
    CreateStoreContactsUseCase,
    CreateStoreProfileUseCase,
    FetchStoreProfileByUserIdUseCase,
  ],
  providers: [
    {
      provide: CreateStoreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new CreateStoreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
    {
      provide: SelectProfileUseCase,
      useFactory: (
        userRepository: IUserRepository,
        encrypterGateway: EncrypterGateway,
      ) => {
        return new SelectProfileUseCase(userRepository, encrypterGateway)
      },
      inject: [InfraUserRepository, EncrypterGateway],
    },
    {
      provide: EditStoreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new EditStoreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
    {
      provide: DeleteStorreProfileUseCase,
      useFactory: (storeProfileRepository: IStoreProfileRepository) => {
        return new DeleteStorreProfileUseCase(storeProfileRepository)
      },
      inject: [InfraStoreProfileRepository],
    },
    {
      provide: FetchStoreProfileUseCase,
      useFactory: (
        storeProfileRepository: IStoreProfileRepository,
        fetchGeoLocationUseCase: FetchGeolocationUseCase,
        fetchStoreContactsUseCase: FetchStoreContactsUseCase,
      ) => {
        return new FetchStoreProfileUseCase(
          storeProfileRepository,
          fetchGeoLocationUseCase,
          fetchStoreContactsUseCase,
        )
      },
      inject: [
        InfraStoreProfileRepository,
        FetchGeolocationUseCase,
        FetchStoreContactsUseCase,
      ],
    },
    {
      provide: FetchStoreProfileByUserIdUseCase,
      useFactory: (
        storeProfileRepository: IStoreProfileRepository,
        fetchGeoLocationUseCase: FetchGeolocationUseCase,
        fetchStoreContactsUseCase: FetchStoreContactsUseCase,
      ) => {
        return new FetchStoreProfileByUserIdUseCase(
          storeProfileRepository,
          fetchGeoLocationUseCase,
          fetchStoreContactsUseCase,
        )
      },
      inject: [
        InfraStoreProfileRepository,
        FetchGeolocationUseCase,
        FetchStoreContactsUseCase,
      ],
    },
    {
      provide: FetchStoreProfileByIdUseCase,
      useFactory: (
        storeProfileRepository: IStoreProfileRepository,
        fetchGeoLocationUseCase: FetchGeolocationUseCase,
        fetchDistance: FetchStoreDistanceFromClientUseCase,
      ) => {
        return new FetchStoreProfileByIdUseCase(
          storeProfileRepository,
          fetchGeoLocationUseCase,
          fetchDistance,
        )
      },
      inject: [
        InfraStoreProfileRepository,
        FetchGeolocationUseCase,
        FetchStoreDistanceFromClientUseCase,
      ],
    },
    {
      provide: CreateStoreSocialsUseCase,
      useFactory: (storeSocialsRepository: IStoreSocialsRepository) => {
        return new CreateStoreSocialsUseCase(storeSocialsRepository)
      },
      inject: [InfraStoreSocialsRepository],
    },
    {
      provide: FetchStoreSocialsUseCase,
      useFactory: (storeSocialsRepository: IStoreSocialsRepository) => {
        return new FetchStoreSocialsUseCase(storeSocialsRepository)
      },
      inject: [InfraStoreSocialsRepository],
    },
    {
      provide: UpdateStoreSocialsUseCase,
      useFactory: (storeSocialsRepository: IStoreSocialsRepository) => {
        return new UpdateStoreSocialsUseCase(storeSocialsRepository)
      },
      inject: [InfraStoreSocialsRepository],
    },
    {
      provide: DeleteStoreSocialsUseCase,
      useFactory: (storeSocialsRepository: IStoreSocialsRepository) => {
        return new DeleteStoreSocialsUseCase(storeSocialsRepository)
      },
      inject: [InfraStoreSocialsRepository],
    },
    {
      provide: DeleteStoreContactsUseCase,
      useFactory: (storeContactsRepository: IStoreContactsRepository) => {
        return new DeleteStoreContactsUseCase(storeContactsRepository)
      },
      inject: [InfraStoreContactsRepository],
    },
    {
      provide: FetchStoreContactsUseCase,
      useFactory: (storeContactsRepository: IStoreContactsRepository) => {
        return new FetchStoreContactsUseCase(storeContactsRepository)
      },
      inject: [InfraStoreContactsRepository],
    },
    {
      provide: CreateStoreContactsUseCase,
      useFactory: (storeContactsRepository: IStoreContactsRepository) => {
        return new CreateStoreContactsUseCase(storeContactsRepository)
      },
      inject: [InfraStoreContactsRepository],
    },
    {
      provide: UpdateStoreContactsUseCase,
      useFactory: (storeContactsRepository: IStoreContactsRepository) => {
        return new UpdateStoreContactsUseCase(storeContactsRepository)
      },
      inject: [InfraStoreContactsRepository],
    },
    {
      provide: SearchStoreProfilesUseCase,
      useFactory: (
        storeProfileRepository: IStoreProfileRepository,
        fetchGeolocationUseCase: FetchGeolocationUseCase,
      ) => {
        return new SearchStoreProfilesUseCase(
          storeProfileRepository,
          fetchGeolocationUseCase,
        )
      },
      inject: [InfraStoreProfileRepository, FetchGeolocationUseCase],
    },
    {
      provide: UpdateStoreProfileImgUseCase,
      useFactory: (
        imageResizerGateway: ImageResizerGateway,
        storeProfileRepository: IStoreProfileRepository,
      ) => {
        return new UpdateStoreProfileImgUseCase(
          imageResizerGateway,
          storeProfileRepository,
        )
      },
      inject: [ImageResizerGateway, InfraStoreProfileRepository],
    },
  ],
})
export class StoreProfileModule {}
