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
import { MessagesProducerGateway } from "@/domain/portal/application/gateways/messageries/messages-producer.gateway"
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
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"
import { CreateSolicitationToStoreUseCase } from "@/domain/portal/application/use-cases/solicitations/create-solicitation-to-store-use-case"
import { CreateSolicitationToStoreUseCaseController } from "./create-solicitation-to-store-use-case.controller"
import { IBudgetRepository } from "@/domain/portal/application/repositories/repair/budget-repository"
import { InfraBudgetRepository } from "@/infra/databases/mongo/repositories/repair/budget/budget.repository"
import { BudgetMongoModule } from "@/infra/databases/mongo/budget.module"
import { DeleteFlaggedSolicitationsUseCase } from "@/domain/portal/application/use-cases/solicitations/delete-flagged-solicitations-use-case"
import { DeleteFlaggedSolicitationsUseCaseController } from "./delete-flagged-solicitations.use-case.controller"
import { CreateImagesToSolicitationUseCaseController } from "./create-images-to-solicitation-use-case.controller"
import { WebsocketGateway } from "@/domain/portal/application/gateways/websocket/websocket.gateway"
import { WebsocketModule } from "@/infra/gateways/websocket/websocket.module"
import { SaveNotificationUseCase } from "@/domain/portal/application/use-cases/notifications/save-notification"
import { NotificationModule } from "../../notification/notification.module"

@Module({
  imports: [
    WebsocketModule,
    MessagesStreamingModule,
    SolicitationMongoModule,
    GeolocationModule,
    ProfilesMongoModule,
    BudgetMongoModule,
    NotificationModule,
  ],
  controllers: [
    DeleteFlaggedSolicitationsUseCaseController,
    FetchSolicitationUseCaseController,
    FetchUserSolicitationsUseCaseController,
    EditSolicitationUseCaseController,
    DeleteSolicitationUseCaseController,
    CreateSolicitationUseCaseController,
    AdminSolicitationUseCaseController,
    AdminSolicitationFormUseCaseController,
    FetchAvaliableSolicitationsToStoreUseCaseController,
    CreateSolicitationToStoreUseCaseController,
    CreateImagesToSolicitationUseCaseController,
  ],
  providers: [
    {
      provide: DeleteFlaggedSolicitationsUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        solicitationFormRepository: ISolicitationFormRepository,
        budgetRepository: IBudgetRepository,
      ) => {
        return new DeleteFlaggedSolicitationsUseCase(
          solicitationRepository,
          solicitationFormRepository,
          budgetRepository,
        )
      },
      inject: [
        InfraSolicitationRepository,
        InfraSolicitationFormRepository,
        InfraBudgetRepository,
      ],
    },
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
        websocketGateway: WebsocketGateway,
        saveNotificationUseCase: SaveNotificationUseCase,
      ) => {
        return new CreateSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
          onSolicitationCreatedUseCase,
          websocketGateway,
          saveNotificationUseCase,
        )
      },
      inject: [
        InfraSolicitationRepository,
        InfraSolicitationFormRepository,
        OnSolicitationCreatedUseCase,
        WebsocketGateway,
        SaveNotificationUseCase,
      ],
    },
    {
      provide: CreateSolicitationToStoreUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        solicitationFormRepository: ISolicitationFormRepository,
      ) => {
        return new CreateSolicitationToStoreUseCase(
          solicitationRepository,
          solicitationFormRepository,
        )
      },
      inject: [InfraSolicitationRepository, InfraSolicitationFormRepository],
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
        budgetRepository: IBudgetRepository,
      ) => {
        return new EditSolicitationFormUseCase(
          solicitationRepository,
          solicitationFormRepository,
          budgetRepository,
        )
      },
      inject: [
        InfraSolicitationRepository,
        InfraSolicitationFormRepository,
        InfraBudgetRepository,
      ],
    },
    {
      provide: DeleteSolicitationUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        solicitationFormRepository: ISolicitationFormRepository,
        budgetRepository: IBudgetRepository,
      ) => {
        return new DeleteSolicitationUseCase(
          solicitationRepository,
          solicitationFormRepository,
          budgetRepository,
        )
      },
      inject: [
        InfraSolicitationRepository,
        InfraSolicitationFormRepository,
        InfraBudgetRepository,
      ],
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
        budgetRepository: IBudgetRepository,
      ) => {
        return new FetchAvaliableSolicitationsToStoreUseCase(
          solicitationRepository,
          fetchClientsInsideStoreLocationUseCase,
          budgetRepository,
        )
      },
      inject: [
        InfraSolicitationRepository,
        FetchClientsInsideStoreLocationUseCase,
        InfraBudgetRepository,
      ],
    },
  ],
})
export class SolicitationsModule {}
