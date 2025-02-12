import { Either, left, right } from "@/core/Either"
import { IFeedbackRepository } from "../../repositories/feedback/feedback-repository"
import { ActionNotAllowedError } from "../../errors/repair/solicitations/ActionNotAllowed"

type DeleteFeedbackUseCaseResponse = Either<ActionNotAllowedError, void>
export class DeleteFeedbackUseCase {
  constructor(private feedBackRepository: IFeedbackRepository) {}

  async execute(
    profileId: string,
    feedbackId: string,
  ): Promise<DeleteFeedbackUseCaseResponse> {
    const feedback = await this.feedBackRepository.findByParam<{
      clientProfileId: string
    }>({ clientProfileId: profileId })
    if (feedback.length === 0) return left(new ActionNotAllowedError())
    const response = await this.feedBackRepository.deleteById(feedbackId)
    return right(response)
  }
}
