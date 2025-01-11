import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { OnSolicitationCreatedUseCase } from "./on-solicitation-created-use-case"
import { Either, right } from "@/core/Either"
import { ProfileNotFound } from "../../errors/profile/ProfileNotFound"

type CreateSolicitationUseCaseResponse = Either<ProfileNotFound, string>
export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
    private readonly onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
  ) {}

  async execute(data: {
    status: string
    profileId: string
    solicitationForm: SolicitationFormProps
  }): Promise<CreateSolicitationUseCaseResponse> {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )

    const result = await this.solicitationRepository.create({
      status: data.status,
      clientProfileId: data.profileId,
      solicitationFormId: resultForm.id,
    })

    //await this.onSolicitationCreatedUseCase.execute(data.userId)
    return right(result.id)
  }
}
