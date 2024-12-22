import { BaseInfraUseCaseController } from "@/core/infra/base.use-case-controller"
import { AdminSolicitationFormUseCase } from "@/domain/portal/application/use-cases/solicitations/admin/admin-solicitation-form.use-case"
import { SolicitationForm } from "@/domain/portal/enterprise/repair/solicitation.form"
import { Controller } from "@nestjs/common"

@Controller("/repair/admin/solicitationform")
export class AdminSolicitationFormUseCaseController extends BaseInfraUseCaseController<SolicitationForm> {
  constructor(private adminSolicitationsUseCase: AdminSolicitationFormUseCase) {
    super(adminSolicitationsUseCase)
  }
}
