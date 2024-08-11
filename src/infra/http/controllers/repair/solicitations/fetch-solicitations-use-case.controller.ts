import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { SolicitationNotFoundError } from "src/domain/portal/application/errors/repair/solicitations/SolicitationNotFoundError"
import { FetchSolicitationsUseCase } from "src/domain/portal/application/use-cases/solicitations/fetch-solicitations-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"
import { SolicitationPresenter } from "src/infra/presenters/repair/solicitations/solicitation-presenter"

@Controller()
export class FetchSolicitationsUseCaseController {
  constructor(private fetchSolicitationsUseCase: FetchSolicitationsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/solicitation")
  async handle(@Req() req: { user: { id: number } }) {
    const response = await this.fetchSolicitationsUseCase.execute(req.user.id)
    if (response.isLeft()) {
      switch (response.value.constructor) {
        case SolicitationNotFoundError:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    const { solicitations } = response.value
    return {
      data: solicitations.map((item) => SolicitationPresenter.toHttp(item)),
    }
  }
}
