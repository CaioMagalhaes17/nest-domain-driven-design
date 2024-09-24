import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"

export class SolicitationPresenter {
  static toHttp(solicitation: Solicitation) {
    return {
      id: solicitation.id,
      userId: solicitation.userId,
      createdAt: solicitation.createdAt,
      status: solicitation.status,
      form: {
        brand: solicitation.form.brand,
        model: solicitation.form.model,
        imeiNumber: solicitation.form.imeiNumber,
        usageTime: solicitation.form.usageTime,
        problemDescription: solicitation.form.problemDescription,
        problemCause: solicitation.form.problemCause,
        previousRepair: solicitation.form.previousRepair,
        originalHardware: solicitation.form.originalHardware,
      },
    }
  }
}
