import { FeedbackProps } from "@/domain/portal/enterprise/feedback/feedback"
import { IFeedbackRepository } from "../../repositories/feedback/feedback-repository"

export class CreateFeedbackUseCase {
  constructor(private feedBackRepository: IFeedbackRepository) {}

  async execute(
    props: Omit<
      FeedbackProps,
      "createdAt" | "updatedAt" | "clientProfile" | "storeProfile"
    >,
  ) {
    const response = await this.feedBackRepository.create(props)
    return response
  }
}
