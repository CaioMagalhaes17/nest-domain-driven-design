import { Module } from "@nestjs/common"
import { FetchUserSolicitationsUseCaseController } from "./fetch-user-solicitations-use-case.controller"
import { EditSolicitationUseCaseController } from "./edit-solicitation-use-case.controller"
import { DeleteSolicitationUseCaseController } from "./delete-solicitation-use-case.controller"
import { FetchUserSolicitationsUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-user-solicitations-use-case"
import { CreateSolicitationUseCase } from "@/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { EditSolicitationFormUseCase } from "@/domain/portal/application/use-cases/solicitations/edit-solicitation-use-case"
import { DeleteSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/delete.solicitation-use-case"
import { FetchSolicitationUseCaseController } from "./fetch-solicitation-use-case.controller"
import { FetchSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitation-use-case"
import { OnSolicitationCreatedUseCase } from "src/domain/portal/application/use-cases/solicitations/on-solicitation-created-use-case"
import { FetchStoresInsideClientRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-stores-inside-client-radius-use-case"
import { MessagesStreamingModule } from "src/infra/gateways/messageries/messages-streaming.module"
import { MessagesProducerGateway } from "src/domain/portal/application/gateway/messageries/messages-producer.gateway"
import { CreateSolicitationUseCaseController } from "./create-solicitation-use-case.controller"
import { SolicitationMongoModule } from "@/infra/databases/mongo/solicitation.module"
import { ISolicitationRepository } from "@/domain/portal/application/repositories/repair/solicitation-repository.interface"
import { InfraSolicitationRepository } from "@/infra/databases/mongo/repositories/repair/solicitation/solicitation.repository"
import { ISolicitationFormRepository } from "@/domain/portal/application/repositories/repair/solicitation-form.repository.interface"
import { InfraSolicitationFormRepository } from "@/infra/databases/mongo/repositories/repair/solicitation/solicitation-form.repository"
import { AdminSolicitationUseCaseController } from "./admin/admin-solicitation-use-case.controller"
import { AdminSolicitationUseCase } from "@/domain/portal/application/use-cases/solicitations/admin/admin-solicitataion.use-case"
import { AdminSolicitationFormUseCaseController } from "./admin/admin-solicitation-form-use-case.controller"
import { AdminSolicitationFormUseCase } from "@/domain/portal/application/use-cases/solicitations/admin/admin-solicitation-form.use-case"
import { GeolocationModule } from "../../geolocation/geolocation.module"
import { FetchAvaliableSolicitationsToStoreUseCaseController } from "./fetch-avaliable-solicitations-to-store-use-case.controller"
import { FetchClientsInsideStoreLocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-clients-inside-store-location-use-case"
import { FetchAvaliableSolicitationsToStoreUseCase } from "@/domain/portal/application/use-cases/solicitations/fetch-avaliable-solicitations-to-store-use-case"

@Module({
  imports: [
    MessagesStreamingModule,
    SolicitationMongoModule,
    GeolocationModule,
  ],
  controllers: [
    FetchSolicitationUseCaseController,
    FetchUserSolicitationsUseCaseController,
    EditSolicitationUseCaseController,
    DeleteSolicitationUseCaseController,
    CreateSolicitationUseCaseController,
    AdminSolicitationUseCaseController,
    AdminSolicitationFormUseCaseController,
    FetchAvaliableSolicitationsToStoreUseCaseController,
  ],
  providers: [
    {
      provide: AdminSolicitationUseCase,
      useFactory: (solicitationRepository: ISolicitationRepository) => {
        return new AdminSolicitationUseCase(solicitationRepository)
      },
      inject: [InfraSolicitationRepository, InfraSolicitationFormRepository],
    },

    {
      provide: AdminSolicitationFormUseCase,
      useFactory: (solicitationRepository: ISolicitationFormRepository) => {
        return new AdminSolicitationFormUseCase(solicitationRepository)
      },
      inject: [InfraSolicitationFormRepository],
    },
    {
      provide: CreateSolicitationUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        solicitationFormRepository: ISolicitationFormRepository,
        onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
      ) => {
        return new CreateSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
          onSolicitationCreatedUseCase,
        )
      },
      inject: [
        InfraSolicitationRepository,
        InfraSolicitationFormRepository,
        OnSolicitationCreatedUseCase,
      ],
    },
    {
      provide: FetchUserSolicitationsUseCase,
      useFactory: (solicitationRepository: ISolicitationRepository) => {
        return new FetchUserSolicitationsUseCase(solicitationRepository)
      },
      inject: [InfraSolicitationRepository],
    },
    {
      provide: EditSolicitationFormUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        solicitationFormRepository: ISolicitationFormRepository,
      ) => {
        return new EditSolicitationFormUseCase(
          solicitationRepository,
          solicitationFormRepository,
        )
      },
      inject: [InfraSolicitationRepository, InfraSolicitationFormRepository],
    },
    {
      provide: DeleteSolicitationUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        solicitationFormRepository: ISolicitationFormRepository,
      ) => {
        return new DeleteSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
        )
      },
      inject: [InfraSolicitationRepository, InfraSolicitationFormRepository],
    },
    {
      provide: FetchSolicitationUseCase,
      useFactory: (solicitationRepository: ISolicitationRepository) => {
        return new FetchSolicitationUseCase(solicitationRepository)
      },
      inject: [InfraSolicitationRepository],
    },
    {
      provide: OnSolicitationCreatedUseCase,
      useFactory: (
        messagesProducerGateway: MessagesProducerGateway,
        fetchStoresInsideRadiusUseCase: FetchStoresInsideClientRadiusUseCase,
      ) => {
        return new OnSolicitationCreatedUseCase(
          messagesProducerGateway,
          fetchStoresInsideRadiusUseCase,
        )
      },
      inject: [MessagesProducerGateway, FetchStoresInsideClientRadiusUseCase],
    },
    {
      provide: FetchAvaliableSolicitationsToStoreUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        fetchClientsInsideStoreLocationUseCase: FetchClientsInsideStoreLocationUseCase,
      ) => {
        return new FetchAvaliableSolicitationsToStoreUseCase(
          solicitationRepository,
          fetchClientsInsideStoreLocationUseCase,
        )
      },
      inject: [
        InfraSolicitationRepository,
        FetchClientsInsideStoreLocationUseCase,
      ],
    },
  ],
})
export class SolicitationsModule {}
