import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"

export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
  ) {}

  async execute(data: {
    status: string
    userId: string
    solicitationForm: SolicitationFormProps
  }) {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )
    console.log(data.userId, resultForm.id)
    const result = await this.solicitationRepository.create({
      status: data.status,
      userId: data.userId,
      formId: resultForm.id,
    })

    //await this.onSolicitationCreatedUseCase.execute(data.userId)
    console.log("O RESULTADO", result)
    return resultForm
  }
}
