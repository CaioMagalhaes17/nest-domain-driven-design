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
    @Req() req: { user: { profileId: string } },
    @Body() solicitationForm: SolicitationFormProps,
  ) {
    const response = await this.createSolicitationsUseCase.execute({
      status: "PENDENTE",
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
