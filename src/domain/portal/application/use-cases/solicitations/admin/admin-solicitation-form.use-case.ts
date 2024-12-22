import { BaseDomainUseCase } from "@/core/domain/base.use-case"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationFormRepository } from "../../../repositories/repair/solicitation-form.repository.interface"

export class AdminSolicitationFormUseCase extends BaseDomainUseCase<SolicitationForm> {
  constructor(protected readonly repository: ISolicitationFormRepository) {
    super(repository)
  }
}
