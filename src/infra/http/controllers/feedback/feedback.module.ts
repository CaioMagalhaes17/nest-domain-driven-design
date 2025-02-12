import { IFeedbackRepository } from "@/domain/portal/application/repositories/feedback/feedback-repository"
import { CreateFeedbackUseCase } from "@/domain/portal/application/use-cases/feedback/create-feeback-use-case"
import { DeleteFeedbackUseCase } from "@/domain/portal/application/use-cases/feedback/delete-feeback-use-case"
import { FetchFeedbackUseCase } from "@/domain/portal/application/use-cases/feedback/fetch-feeback-use-case"
import { FetchFeedbacksByStoreUseCase } from "@/domain/portal/application/use-cases/feedback/fetch-feedback-by-store-use-case"
import { FeedbackMongoModule } from "@/infra/databases/mongo/feedback.module"
import { InfraFeedbackRepository } from "@/infra/databases/mongo/repositories/feedback/feedback-respository"
import { Module } from "@nestjs/common"
import { CreateFeedbackUseCaseController } from "./create-feeback-use-case.controller"
import { DeleteFeedbackUseCaseController } from "./delete-feeback-use-case.controller"
import { FetchFeedbackUseCaseController } from "./fetch-feeback-use-case.controller"
import { FetchFeedbacksByStoreUseCaseController } from "./fetch-feedback-by-store-use-case.controller"

@Module({
  imports: [FeedbackMongoModule],
  controllers: [
    CreateFeedbackUseCaseController,
    DeleteFeedbackUseCaseController,
    FetchFeedbackUseCaseController,
    FetchFeedbacksByStoreUseCaseController,
  ],
  providers: [
    {
      provide: CreateFeedbackUseCase,
      useFactory: (feedbackRepository: IFeedbackRepository) => {
        return new CreateFeedbackUseCase(feedbackRepository)
      },
      inject: [InfraFeedbackRepository],
    },
    {
      provide: DeleteFeedbackUseCase,
      useFactory: (feedbackRepository: IFeedbackRepository) => {
        return new DeleteFeedbackUseCase(feedbackRepository)
      },
      inject: [InfraFeedbackRepository],
    },
    {
      provide: FetchFeedbackUseCase,
      useFactory: (feedbackRepository: IFeedbackRepository) => {
        return new FetchFeedbackUseCase(feedbackRepository)
      },
      inject: [InfraFeedbackRepository],
    },
    {
      provide: FetchFeedbacksByStoreUseCase,
      useFactory: (feedbackRepository: IFeedbackRepository) => {
        return new FetchFeedbacksByStoreUseCase(feedbackRepository)
      },
      inject: [InfraFeedbackRepository],
    },
  ],
})
export class FeedbackModule {}
