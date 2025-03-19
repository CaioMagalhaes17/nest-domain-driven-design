import { Either, left, right } from "src/core/Either"
import { BudgetDTO } from "../../dto/budget/http/budget-create"
import { IBudgetRepository } from "../../repositories/repair/budget-repository"
import { SolicitationNotFoundError } from "../../errors/repair/solicitations/SolicitationNotFoundError"
import { BudgetAlreadySent } from "../../errors/repair/budget/BudgetAlreadySent"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { OnBudgetCreatedUseCase } from "./on-budget-created"
import { IStoreProfileRepository } from "../../repositories/profile/store/store-profile.repository"

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
    private onBudgetCreatedUseCase: OnBudgetCreatedUseCase,
    private storeProfileRepository: IStoreProfileRepository,
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
      solicitationId: string
      storeProfileId: string
    }>({
      storeProfileId,
      solicitationId: createBudgetPayload.solicitationId,
    })
    if (budget.length > 0) return left(new BudgetAlreadySent())

    const result = await this.budgetRepository.create({
      startValue: createBudgetPayload.startValue,
      endValue: createBudgetPayload.endValue,
      storeProfileId: storeProfileId,
      solicitationId: createBudgetPayload.solicitationId,
      details: createBudgetPayload.details,
    })

    const storeProfile =
      await this.storeProfileRepository.findById(storeProfileId)
    await this.onBudgetCreatedUseCase.execute({
      clientProfileId: solicitation.clientProfile.id,
      topic: solicitation.form.problemTopic,
      price:
        createBudgetPayload.startValue + " até " + createBudgetPayload.endValue,
      email: solicitation.clientProfile.email,
      storeName: storeProfile.name,
      budgetId: result.id,
      storeProfileImg: storeProfile.profileImg,
    })
    return right({ id: result.id })
  }
}
