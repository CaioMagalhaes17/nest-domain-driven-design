import { BaseDomainUseCase } from "@/core/domain/base.use-case"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { ISolicitationRepository } from "../../../repositories/repair/solicitation-repository.interface"

export class AdminSolicitationUseCase extends BaseDomainUseCase<Solicitation> {
  constructor(protected readonly repository: ISolicitationRepository) {
    super(repository)
  }
}
