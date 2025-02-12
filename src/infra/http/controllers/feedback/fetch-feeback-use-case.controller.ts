import { FeedbackNotFound } from "@/domain/portal/application/errors/feedback/feedback-not-found"
import { FetchFeedbackUseCase } from "@/domain/portal/application/use-cases/feedback/fetch-feeback-use-case"
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { NotFoundError } from "rxjs"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchFeedbackUseCaseController {
  constructor(private fetchFeedbackUseCase: FetchFeedbackUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/feedback/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("id") id: string,
  ) {
    const response = await this.fetchFeedbackUseCase.execute(id)

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case FeedbackNotFound:
          throw new NotFoundError(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response.value
  }
}
