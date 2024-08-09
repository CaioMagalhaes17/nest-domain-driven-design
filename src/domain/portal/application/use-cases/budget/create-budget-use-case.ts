import { Either, left, right } from "src/core/Either"
import { BudgetDTO } from "../../dto/budget/http/budget-create"
import { BudgetRepository } from "../../repositories/repair/budget-repository"
import { SolicitationRepository } from "../../repositories/repair/solicitation-repository"
import { FetchInitialBudgetStatusUseCase } from "./status/fetch-initial-budget-status-use-case"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { BudgetAlreadySent } from "../../errors/repair/budget/BudgetAlreadySent"

type CreateBudgetUseCaseResponse = Either<
  SolicitationNotFoundError | BudgetAlreadySent,
  {
    id: number
  }
>

export class CreateBudgetUseCase {
  constructor(
    private budgetRepository: BudgetRepository,
    private solicitationRepository: SolicitationRepository,
  ) {}

  async execute(
    createBudgetPayload: BudgetDTO,
    userId: number,
  ): Promise<CreateBudgetUseCaseResponse> {
    const solicitation = await this.solicitationRepository.fetchById(
      createBudgetPayload.solicitationId,
    )

    const budget = await this.budgetRepository.fetchBySolicitationId(
      createBudgetPayload.solicitationId,
    )

    if (budget) return left(new BudgetAlreadySent())

    if (!solicitation) return left(new SolicitationNotFoundError())

    const result = await this.budgetRepository.insert({
      estimatedPrice: createBudgetPayload.estimatedPrice,
      status: FetchInitialBudgetStatusUseCase.execute(),
      solicitationId: createBudgetPayload.solicitationId,
      userId,
    })

    return right({ id: result })
  }
}
