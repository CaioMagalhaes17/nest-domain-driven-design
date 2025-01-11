import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { SolicitationNotFoundError } from "src/domain/portal/application/errors/repair/solicitations/SolicitationNotFoundError"
import { UnauthorizedSolicitationActionError } from "src/domain/portal/application/errors/repair/solicitations/UnauthorizedSolicitationAction"
import { FetchSolicitationUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitation-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { SolicitationPresenter } from "src/infra/presenters/repair/solicitations/solicitation-presenter"

@Controller()
export class FetchSolicitationUseCaseController {
  constructor(private fetchSolicitationUseCase: FetchSolicitationUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/solicitation/:solicitationId")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("solicitationId") solicitationId: string,
  ) {
    const response = await this.fetchSolicitationUseCase.execute(
      solicitationId,
      req.user.profileId,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case SolicitationNotFoundError:
          throw new NotFoundException(response.value.message)
        case UnauthorizedSolicitationActionError:
          throw new UnauthorizedException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    const { solicitation } = response.value

    return {
      data: SolicitationPresenter.toHttp(solicitation),
    }
  }
}
