import {
  SolicitationForm,
  SolicitationFormProps,
} from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { OnSolicitationCreatedUseCase } from "./on-solicitation-created-use-case"

export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
  ) {}

  async execute(data: {
    status: string
    userId: number
    solicitationForm: SolicitationFormProps
  }) {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )

    const result = await this.solicitationRepository.create({
      status: "nigger",
      userId: data.userId,
      formId: resultForm.id,
    })

    //await this.onSolicitationCreatedUseCase.execute(data.userId)
    console.log("O RESULTADO", result)
    return resultForm
  }
}
