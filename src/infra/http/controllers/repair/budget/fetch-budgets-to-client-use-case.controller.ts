import { FetchBudgetsToClientUseCase } from "@/domain/portal/application/use-cases/budget/fetch-budgets-to-client-use-case"
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common"
import { BudgetNotFound } from "src/domain/portal/application/errors/repair/budget/BudgetNotFound"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class FetchBudgetsToClientUseCaseController {
  constructor(
    private fetchBudgetsToClientUseCase: FetchBudgetsToClientUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/repair/budget/to-client")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    const response = await this.fetchBudgetsToClientUseCase.execute(
      req.user.profileId,
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

    return {
      data: response.value,
    }
  }
}
