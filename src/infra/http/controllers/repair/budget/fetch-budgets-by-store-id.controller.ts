import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common"
import { BudgetNotFound } from "src/domain/portal/application/errors/repair/budget/BudgetNotFound"
import { FetchBudgetsUseCase } from "src/domain/portal/application/use-cases/budget/fetch-budgets-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchBudgetsByStoreIdUseCaseController {
  constructor(private fetchBudgetsUseCase: FetchBudgetsUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/budget/by-store/:id")
  async handle(
    @Param("id") id: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    const response = await this.fetchBudgetsUseCase.execute(
      id,
      page !== "undefined" && limit !== "undefined"
        ? { page: Number(page), limit: Number(limit) }
        : null,
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
