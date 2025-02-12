import { Either, left, right } from "src/core/Either"
import { FeedbackNotFound } from "../../errors/feedback/feedback-not-found"
import { IFeedbackRepository } from "../../repositories/feedback/feedback-repository"

type FetchFeedbackUseCaseResponse = Either<FeedbackNotFound, any>
export class FetchFeedbackUseCase {
  constructor(private feedBackRepository: IFeedbackRepository) {}

  async execute(feedbackId: string): Promise<FetchFeedbackUseCaseResponse> {
    const feedback = await this.feedBackRepository.findById(feedbackId)
    if (!feedback) return left(new FeedbackNotFound())
    return right(feedback)
  }
}
