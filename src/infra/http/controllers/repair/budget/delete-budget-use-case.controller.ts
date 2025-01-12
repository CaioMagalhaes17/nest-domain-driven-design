import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { BudgetActionNotAllowed } from "src/domain/portal/application/errors/repair/budget/BudgetActionNotAllowed"
import { BudgetNotFound } from "src/domain/portal/application/errors/repair/budget/BudgetNotFound"
import { DeleteBudgetUseCase } from "src/domain/portal/application/use-cases/budget/delete-budget-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class DeleteBudgetUseCaseController {
  constructor(private deleteBudgetUseCase: DeleteBudgetUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Delete("/repair/budget/:budgetId")
  async handle(
    @Req() req: { user: { profileId: string } },
    @Param("budgetId") budgetId: string,
  ) {
    const response = await this.deleteBudgetUseCase.execute(
      budgetId,
      req.user.profileId,
    )

    if (response && response.isLeft()) {
      switch (response.value.constructor) {
        case BudgetNotFound:
          throw new NotFoundException(response.value.message)
        case BudgetActionNotAllowed:
          throw new NotFoundException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }
  }
}
