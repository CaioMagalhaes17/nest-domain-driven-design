import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import { DeleteFeedbackUseCase } from "@/domain/portal/application/use-cases/feedback/delete-feeback-use-case"
import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteFeedbackUseCaseController {
  constructor(private deleteFeedbackUseCase: DeleteFeedbackUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/feedback/:id")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("id") id: string,
  ) {
    const response = await this.deleteFeedbackUseCase.execute(
      req.user.profileId,
      id,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ActionNotAllowedError:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response.value
  }
}
