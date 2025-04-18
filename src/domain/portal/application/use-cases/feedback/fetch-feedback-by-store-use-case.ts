import { Either, left, right } from "src/core/Either"
import { FeedbackNotFound } from "../../errors/feedback/feedback-not-found"
import { IFeedbackRepository } from "../../repositories/feedback/feedback-repository"

type FetchFeedbacksByStoreUseCaseResponse = Either<FeedbackNotFound, any>
export class FetchFeedbacksByStoreUseCase {
  constructor(private feedBackRepository: IFeedbackRepository) {}

  async execute(
    storeProfileId: string,
    paginationObj?: { page: number; limit: number },
  ): Promise<FetchFeedbacksByStoreUseCaseResponse> {
    const feedback = await this.feedBackRepository.findByParam<{
      storeProfileId: string
    }>({ storeProfileId }, paginationObj)
    if (feedback.length === 0) return left(new FeedbackNotFound())
    return right(feedback)
  }
}
