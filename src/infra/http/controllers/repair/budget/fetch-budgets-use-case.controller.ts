import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from "@nestjs/common"
import { BudgetNotFound } from "src/domain/portal/application/errors/repair/budget/BudgetNotFound"
import { FetchBudgetsUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budgets-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchBudgetsUseCaseController {
  constructor(private fetchBudgetsUseCase: FetchBudgetsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/budget")
  async handle(@Req() req: { user: { profileId: string } }) {
    const response = await this.fetchBudgetsUseCase.execute(req.user.profileId)

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
