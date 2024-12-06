import { BaseInfraUseCaseController } from "@/core/infra/base.use-case-controller"
import { AdminSolicitationUseCase } from "@/domain/portal/application/use-cases/solicitations/admin/admin-solicitataion.use-case"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"
import { Controller } from "@nestjs/common"

@Controller("/repair/admin/solicitation")
export class AdminSolicitationUseCaseController extends BaseInfraUseCaseController<Solicitation> {
  constructor(private adminSolicitationsUseCase: AdminSolicitationUseCase) {
    super(adminSolicitationsUseCase)
  }
}
