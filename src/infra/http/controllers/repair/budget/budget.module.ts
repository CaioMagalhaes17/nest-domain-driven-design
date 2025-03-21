import { Module } from "@nestjs/common"
import { CreateBudgetUseCaseController } from "./create-budget-use-case.controller"
import { CreateBudgetUseCase } from "src/domain/portal/application/use-cases/budget/create-budget-use-case"
import { IBudgetRepository } from "src/domain/portal/application/repositories/repair/budget-repository"
import { FetchBudgetsUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budgets-use-case"
import { FetchBudgetsUseCaseController } from "./fetch-budgets-use-case.controller"
import { FetchBudgetUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budget-use-case"
import { FetchBudgetUseCaseController } from "./fetch.budget-use-case.controller"
import { DeleteBudgetUseCase } from "src/domain/portal/application/use-cases/budget/delete-budget-use-case"
import { DeleteBudgetUseCaseController } from "./delete-budget-use-case.controller"
import { SolicitationMongoModule } from "@/infra/databases/mongo/solicitation.module"
import { ISolicitationRepository } from "@/domain/portal/application/repositories/repair/solicitation-repository.interface"
import { BudgetMongoModule } from "@/infra/databases/mongo/budget.module"
import { InfraBudgetRepository } from "@/infra/databases/mongo/repositories/repair/budget/budget.repository"
import { InfraSolicitationRepository } from "@/infra/databases/mongo/repositories/repair/solicitation/solicitation.repository"
import { FetchStoreBudgetBySolicitationUseCase } from "@/domain/portal/application/use-cases/budget/fetch-store-budgets-by-solicitation"
import { FetchBudgetsBySolicitationUseCase } from "@/domain/portal/application/use-cases/budget/fetch-budgets-by-solicitation"
import { FetchBudgetsBySolicitationUseCaseController } from "./fetch-budgets-by-solicitation-use-case.controller"
import { FetchStoreBudgetBySolicitationUseCaseController } from "./fetch-store-budgets-by-solicitation-use-case.controller"
import { FetchBudgetsToClientUseCase } from "@/domain/portal/application/use-cases/budget/fetch-budgets-to-client-use-case"
import { FetchBudgetsToClientUseCaseController } from "./fetch-budgets-to-client-use-case.controller"
import { FetchBudgetsByStoreIdUseCase } from "@/domain/portal/application/use-cases/budget/fetch-budgets-by-store-id"
import { FetchBudgetsByStoreIdUseCaseController } from "./fetch-budgets-by-store-id.controller"
import { OnBudgetCreatedUseCase } from "@/domain/portal/application/use-cases/budget/on-budget-created"
import { IStoreProfileRepository } from "@/domain/portal/application/repositories/profile/store/store-profile.repository"
import { InfraStoreProfileRepository } from "@/infra/databases/mongo/repositories/profiles/store.repository"
import { ProfilesMongoModule } from "@/infra/databases/mongo/profiles.module"
import { MessagesProducerGateway } from "@/domain/portal/application/gateways/messageries/messages-producer.gateway"
import { MessagesStreamingModule } from "@/infra/gateways/messageries/messages-streaming.module"
import { FetchGeolocationUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-geolocation-use-case"
import { FetchStoreDistanceFromClientUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-store-distance-from-client"
import { GeolocationModule } from "../../geolocation/geolocation.module"

@Module({
  imports: [
    SolicitationMongoModule,
    BudgetMongoModule,
    ProfilesMongoModule,
    MessagesStreamingModule,
    GeolocationModule,
  ],
  controllers: [
    FetchBudgetsToClientUseCaseController,
    CreateBudgetUseCaseController,
    FetchBudgetsUseCaseController,
    FetchBudgetUseCaseController,
    DeleteBudgetUseCaseController,
    FetchBudgetsBySolicitationUseCaseController,
    FetchStoreBudgetBySolicitationUseCaseController,
    FetchBudgetsByStoreIdUseCaseController,
  ],
  providers: [
    {
      provide: OnBudgetCreatedUseCase,
      useFactory: (messagesProducerGateway: MessagesProducerGateway) => {
        return new OnBudgetCreatedUseCase(messagesProducerGateway)
      },
      inject: [MessagesProducerGateway],
    },
    {
      provide: FetchBudgetsToClientUseCase,
      useFactory: (
        solicitationRepository: ISolicitationRepository,
        budgetRepository: IBudgetRepository,
        fetchStoreDistanceFromClientUseCase: FetchStoreDistanceFromClientUseCase,
        fetchGeolocationUseCase: FetchGeolocationUseCase,
      ) => {
        return new FetchBudgetsToClientUseCase(
          solicitationRepository,
          budgetRepository,
          fetchStoreDistanceFromClientUseCase,
          fetchGeolocationUseCase,
        )
      },
      inject: [
        InfraSolicitationRepository,
        InfraBudgetRepository,
        FetchStoreDistanceFromClientUseCase,
        FetchGeolocationUseCase,
      ],
    },
    {
      provide: CreateBudgetUseCase,
      useFactory: (
        budgetRepository: IBudgetRepository,
        solicitationRepository: ISolicitationRepository,
        onBudgetCreatedUseCase: OnBudgetCreatedUseCase,
        storeProfileRepository: IStoreProfileRepository,
      ) => {
        return new CreateBudgetUseCase(
          budgetRepository,
          solicitationRepository,
          onBudgetCreatedUseCase,
          storeProfileRepository,
        )
      },
      inject: [
        InfraBudgetRepository,
        InfraSolicitationRepository,
        OnBudgetCreatedUseCase,
        InfraStoreProfileRepository,
      ],
    },

    {
      provide: FetchBudgetsUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchBudgetsUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchStoreBudgetBySolicitationUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchStoreBudgetBySolicitationUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchBudgetsBySolicitationUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchBudgetsBySolicitationUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchBudgetUseCase,
      useFactory: (
        budgetRepository: IBudgetRepository,
        fetchStoreDistanceFromClientUseCase: FetchStoreDistanceFromClientUseCase,
        fetchGeolocationUseCase: FetchGeolocationUseCase,
      ) => {
        return new FetchBudgetUseCase(
          budgetRepository,
          fetchStoreDistanceFromClientUseCase,
          fetchGeolocationUseCase,
        )
      },
      inject: [
        InfraBudgetRepository,
        FetchStoreDistanceFromClientUseCase,
        FetchGeolocationUseCase,
      ],
    },
    {
      provide: DeleteBudgetUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new DeleteBudgetUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
    {
      provide: FetchBudgetsByStoreIdUseCase,
      useFactory: (budgetRepository: IBudgetRepository) => {
        return new FetchBudgetsByStoreIdUseCase(budgetRepository)
      },
      inject: [InfraBudgetRepository],
    },
  ],
})
export class BudgetModule {}
