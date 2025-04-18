import { DIRECT_SOLICITATION } from "@/domain/portal/application/constants/solicitation-status"
import { ProfileNotFound } from "@/domain/portal/application/errors/profile/ProfileNotFound"
import { CreateSolicitationToStoreUseCase } from "@/domain/portal/application/use-cases/solicitations/create-solicitation-to-store-use-case"
import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
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
  @Post("/repair/solicitation/:storeProfileId")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("storeProfileId") storeProfileId: string,
    @Body()
    solicitationForm: SolicitationFormProps,
  ) {
    const response = await this.createSolicitationsUseCase.execute(
      {
        status: DIRECT_SOLICITATION,
        profileId: req.user.profileId,
        solicitationForm,
      },
      storeProfileId,
    )

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
