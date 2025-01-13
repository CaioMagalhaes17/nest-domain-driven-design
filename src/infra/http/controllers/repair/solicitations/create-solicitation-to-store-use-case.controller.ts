import { OPEN_TO_BUDGETS_SOLICITATION_STATUS } from "@/domain/portal/application/constants/solicitation-status"
import { ProfileNotFound } from "@/domain/portal/application/errors/profile/ProfileNotFound"
import { CreateSolicitationToStoreUseCase } from "@/domain/portal/application/use-cases/solicitations/create-solicitation-to-store-use-case"
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
export class CreateSolicitationToStoreUseCaseController {
  constructor(
    private createSolicitationsUseCase: CreateSolicitationToStoreUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("/repair/solicitation/to-store")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Body()
    solicitationForm: SolicitationFormProps & { storeProfileId: string },
  ) {
    const response = await this.createSolicitationsUseCase.execute({
      status: OPEN_TO_BUDGETS_SOLICITATION_STATUS,
      profileId: req.user.profileId,
      solicitationForm,
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
