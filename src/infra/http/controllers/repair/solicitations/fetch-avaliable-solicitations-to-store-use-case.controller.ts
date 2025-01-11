import { FetchAvaliableSolicitationsToStoreUseCase } from "@/domain/portal/application/use-cases/solicitations/fetch-avaliable-solicitations-to-store-use-case"
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { SolicitationNotFoundError } from "src/domain/portal/application/errors/repair/solicitations/SolicitationNotFoundError"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchAvaliableSolicitationsToStoreUseCaseController {
  constructor(
    private fetchAvaliableSolicitationsToStoreUseCase: FetchAvaliableSolicitationsToStoreUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/avaliable/solicitations")
  async handle(@Req() req: { user: { id: string } }) {
    const response =
      await this.fetchAvaliableSolicitationsToStoreUseCase.execute(req.user.id)
    if (response.isLeft()) {
      switch (response.value.constructor) {
        case SolicitationNotFoundError:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    const retorno = response.value
    return {
      data: retorno,
    }
  }
}
