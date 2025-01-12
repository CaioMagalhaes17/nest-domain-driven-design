import { Either, left, right } from "src/core/Either"
import { BudgetDTO } from "../../dto/budget/http/budget-create"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { FetchInitialBudgetStatusUseCase } from "./status/fetch-initial-budget-status-use-case"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { BudgetAlreadySent } from "../../errors/repair/budget/BudgetAlreadySent"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"

type CreateBudgetUseCaseResponse = Either<
  SolicitationNotFoundError | BudgetAlreadySent,
  {
    id: string
  }
>

export class CreateBudgetUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    private solicitationRepository: ISolicitationRepository,
  ) {}

  async execute(
    createBudgetPayload: BudgetDTO,
    storeProfileId: string,
  ): Promise<CreateBudgetUseCaseResponse> {
    const solicitation = await this.solicitationRepository.findById(
      createBudgetPayload.solicitationId,
    )

    if (!solicitation) return left(new SolicitationNotFoundError())

    const budget = await this.budgetRepository.findByParam<{
      storeProfileId: string
      solicitationId: string
    }>({
      storeProfileId,
      solicitationId: solicitation.id,
    })

    if (budget.length > 0) return left(new BudgetAlreadySent())

    const result = await this.budgetRepository.create({
      estimatedPrice: createBudgetPayload.estimatedPrice,
      status: FetchInitialBudgetStatusUseCase.execute(),
      solicitationId: createBudgetPayload.solicitationId,
      storeProfileId: storeProfileId,
    })
    return right({ id: result.id })
  }
}
