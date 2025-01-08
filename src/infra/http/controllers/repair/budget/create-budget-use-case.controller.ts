import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { BudgetDTO } from "src/domain/portal/application/dto/budget/http/budget-create"
import { BudgetAlreadySent } from "src/domain/portal/application/errors/repair/budget/BudgetAlreadySent"
import { SolicitationNotFoundError } from "src/domain/portal/application/errors/repair/solicitations/SolicitationNotFoundError"
import { CreateBudgetUseCase } from "src/domain/portal/application/use-cases/budget/create-budget-use-case"
import { JwtAuthGuard } from "src/infra/auth/guards/jwt.guard"

@Controller()
export class CreateBudgetUseCaseController {
  constructor(private createBudgetUseCase: CreateBudgetUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/repair/budget")
  async handle(
    @Req() req: { user: { id: number } },
    @Body() createBudgetPayload: BudgetDTO,
  ) {
    const response = await this.createBudgetUseCase.execute(
      createBudgetPayload,
      req.user.id,
    )
    if (response.isLeft()) {
      switch (response.value.constructor) {
        case SolicitationNotFoundError:
          throw new BadRequestException(response.value.message)
        case BudgetAlreadySent:
          throw new BadRequestException(response.value.message)
        default:
          throw new BadRequestException("Erro não tratado")
      }
    }

    return response.value
  }
}
