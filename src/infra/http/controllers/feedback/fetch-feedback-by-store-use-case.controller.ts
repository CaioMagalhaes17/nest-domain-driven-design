import { FeedbackNotFound } from "@/domain/portal/application/errors/feedback/feedback-not-found"
import { FetchFeedbacksByStoreUseCase } from "@/domain/portal/application/use-cases/feedback/fetch-feedback-by-store-use-case"
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchFeedbacksByStoreUseCaseController {
  constructor(
    private fetchFeedbacksByStoreUseCase: FetchFeedbacksByStoreUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/feedback/by-store/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("id") id: string,
  ) {
    const response = await this.fetchFeedbacksByStoreUseCase.execute(id)
    console.log(response)
    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case FeedbackNotFound:
          return []
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
    return response.value
  }
}
