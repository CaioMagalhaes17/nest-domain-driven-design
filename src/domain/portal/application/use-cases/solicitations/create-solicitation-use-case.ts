import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { OnSolicitationCreatedUseCase } from "./on-solicitation-created-use-case"
import { Either, right } from "@/core/Either"
import { ProfileNotFound } from "../../errors/profile/ProfileNotFound"
import { FetchClientProfileUseCase } from "../profile/client/fetch-client-profile-use-case"

type CreateSolicitationUseCaseResponse = Either<ProfileNotFound, string>
export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
    private readonly onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
    private readonly fetchClientProfileUseCase: FetchClientProfileUseCase,
  ) {}

  async execute(data: {
    status: string
    profileId: string
    userId: string
    solicitationForm: SolicitationFormProps
  }): Promise<CreateSolicitationUseCaseResponse> {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )

    const profile = await this.fetchClientProfileUseCase.execute(data.userId)

    const result = await this.solicitationRepository.create({
      status: data.status,
      clientProfileId: data.profileId,
      solicitationFormId: resultForm.id,
    })
    if (profile.isLeft()) return
    await this.onSolicitationCreatedUseCase.execute({
      name: profile.value.profile.name,
      profileId: data.profileId,
      solicitationId: result.id,
      timePreference: data.solicitationForm.timePreference,
      topic: data.solicitationForm.problemTopic,
    })
    return right(result.id)
  }
}
