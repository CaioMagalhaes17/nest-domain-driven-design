import { ActionNotAllowedError } from "@/domain/portal/application/errors/repair/solicitations/ActionNotAllowed"
import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { SolicitationNotFoundError } from "src/domain/portal/application/errors/repair/solicitations/SolicitationNotFoundError"
import { UnauthorizedSolicitationActionError } from "src/domain/portal/application/errors/repair/solicitations/UnauthorizedSolicitationAction"
import { DeleteSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/delete.solicitation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteSolicitationUseCaseController {
  constructor(private deleteSolicitationUseCase: DeleteSolicitationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/repair/solicitation/:solicitationId")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("solicitationId") solicitationId: string,
  ) {
    const response = await this.deleteSolicitationUseCase.execute({
      profileId: req.user.profileId,
      solicitationId,
    })
    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case SolicitationNotFoundError:
          throw new NotFoundException(response.value.message)
        case UnauthorizedSolicitationActionError:
          throw new UnauthorizedException(response.value.message)
        case ActionNotAllowedError:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
