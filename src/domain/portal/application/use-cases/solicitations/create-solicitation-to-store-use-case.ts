import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { Either, right } from "@/core/Either"
import { ProfileNotFound } from "../../errors/profile/ProfileNotFound"

type CreateSolicitationUseCaseResponse = Either<ProfileNotFound, string>
export class CreateSolicitationToStoreUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
  ) {}

  async execute(
    data: {
      status: string
      profileId: string
      solicitationForm: SolicitationFormProps
    },
    storeProfileId: string,
  ): Promise<CreateSolicitationUseCaseResponse> {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )

    const result = await this.solicitationRepository.create({
      status: data.status,
      clientProfileId: data.profileId,
      solicitationFormId: resultForm.id,
      storeProfileId,
    })

    return right(result.id)
  }
}
