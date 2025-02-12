import { CreateFeedbackUseCase } from "@/domain/portal/application/use-cases/feedback/create-feeback-use-case"
import { FeedbackProps } from "@/domain/portal/enterprise/feedback/feedback"
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateFeedbackUseCaseController {
  constructor(private createFeedbackUseCase: CreateFeedbackUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/feedback")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body()
    createFeedback: Omit<
      FeedbackProps,
      "createdAt" | "updatedAt" | "clientProfile" | "storeProfile"
    >,
  ) {
    const response = await this.createFeedbackUseCase.execute({
      clientProfileId: req.user.profileId,
      ...createFeedback,
    })

    return response
  }
}
