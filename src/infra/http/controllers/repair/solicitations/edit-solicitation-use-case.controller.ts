import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { SolicitationNotFoundError } from "src/domain/portal/application/errors/repair/solicitations/SolicitationNotFoundError"
import { UnauthorizedSolicitationActionError } from "src/domain/portal/application/errors/repair/solicitations/UnauthorizedSolicitationAction"
import { EditSolicitationFormUseCase } from "@/domain/portal/application/use-cases/solicitations/edit-solicitation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class EditSolicitationUseCaseController {
  constructor(private editSolicitationUseCase: EditSolicitationFormUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Put("/repair/solicitation/:solicitationId")
  async handle(
    @Req() req: { user: { id: string } },
    @Body() solicitationFormPayload: any,
    @Param("solicitationId") solicitationId: string,
  ) {
    const response = await this.editSolicitationUseCase.execute({
      solicitationFormPayload,
      userId: req.user.id,
      solicitationId,
    })
    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case SolicitationNotFoundError:
          throw new NotFoundException(response.value.message)
        case UnauthorizedSolicitationActionError:
          throw new UnauthorizedException(response.value.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
