import { FetchStoreBudgetBySolicitationUseCase } from "@/domain/portal/application/use-cases/budget/fetch-store-budgets-by-solicitation"
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { BudgetNotFound } from "src/domain/portal/application/errors/repair/budget/BudgetNotFound"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchStoreBudgetBySolicitationUseCaseController {
  constructor(
    private fetchBudgetsUseCase: FetchStoreBudgetBySolicitationUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/budget/store/by-solicitation/:solicitationId")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("solicitationId") solicitationId: string,
  ) {
    const response = await this.fetchBudgetsUseCase.execute(
      req.user.profileId,
      solicitationId,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case BudgetNotFound:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    const { budget } = response.value

    return {
      data: budget,
    }
  }
}
