import { OPEN_TO_BUDGETS_SOLICITATION_STATUS } from "@/domain/portal/application/constants/solicitation-status"
import { ProfileNotFound } from "@/domain/portal/application/errors/profile/ProfileNotFound"
import { CreateSolicitationUseCase } from "@/domain/portal/application/use-cases/solicitations/create-solicitation-use-case"
import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateSolicitationUseCaseController {
  constructor(private createSolicitationsUseCase: CreateSolicitationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/repair/solicitation")
  async handle(
    @Req() req: { user: { profileId: string; id: string } },
    @Body() solicitationForm: SolicitationFormProps,
  ) {
    const response = await this.createSolicitationsUseCase.execute({
      status: OPEN_TO_BUDGETS_SOLICITATION_STATUS,
      profileId: req.user.profileId,
      solicitationForm,
      userId: req.user.id,
    })

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case ProfileNotFound:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException()
      }
    }

    return { id: response.value }
  }
}
