import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { BudgetActionNotAllowed } from "src/domain/portal/application/errors/repair/budget/BudgetActionNotAllowed"
import { BudgetNotFound } from "src/domain/portal/application/errors/repair/budget/BudgetNotFound"
import { FetchBudgetUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budget-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchBudgetUseCaseController {
  constructor(private fetchBudgetUseCase: FetchBudgetUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/budget/:budgetId")
  async handle(
    @Req() req: { user: { id: number } },
    @Param("budgetId") budgetId: string,
  ) {
    const response = await this.fetchBudgetUseCase.execute(
      budgetId,
      req.user.id,
    )

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case BudgetNotFound:
          throw new NotFoundException(response.value.message)
        case BudgetActionNotAllowed:
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
