import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Feedback, FeedbackSchema } from "./schemas/feedback/feedback-schema"
import { InfraFeedbackRepository } from "./repositories/feedback/feedback-respository"
import { FeedbackMapper } from "./mappers/feedback/feedback-mapper"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  providers: [
    FeedbackMapper,
    {
      provide: InfraFeedbackRepository,
      useFactory: (model: Model<Feedback>, mapper: FeedbackMapper) => {
        return new InfraFeedbackRepository(model, mapper)
      },
      inject: [getModelToken(Feedback.name), FeedbackMapper],
    },
  ],
  exports: [InfraFeedbackRepository],
})
export class FeedbackMongoModule {}
