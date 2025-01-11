import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { OnSolicitationCreatedUseCase } from "./on-solicitation-created-use-case"
import { IClientProfileRepository } from "../../repositories/profile/client/client-profile.repository"
import { Either, left, right } from "@/core/Either"
import { ProfileNotFound } from "../../errors/profile/ProfileNotFound"

type CreateSolicitationUseCaseResponse = Either<ProfileNotFound, string>
export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
    private readonly onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
    private readonly clientProfileRepository: IClientProfileRepository,
  ) {}

  async execute(data: {
    status: string
    userId: string
    solicitationForm: SolicitationFormProps
  }): Promise<CreateSolicitationUseCaseResponse> {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )

    const profile = await this.clientProfileRepository.findByParam<{
      userId: string
    }>({ userId: data.userId })

    if (profile.length === 0) return left(new ProfileNotFound())
    const result = await this.solicitationRepository.create({
      status: data.status,
      clientProfile: profile[0].id,
      solicitationForm: resultForm.id,
    })

    //await this.onSolicitationCreatedUseCase.execute(data.userId)
    return right(result.id)
  }
}
