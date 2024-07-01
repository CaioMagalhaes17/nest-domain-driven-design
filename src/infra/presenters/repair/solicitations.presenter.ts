import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"

export class SolicitationsPresenter {
  static toHttp(solicitation: Solicitation) {
    return {
      id: solicitation.id,
      userId: solicitation.userId,
      createdAt: solicitation.createdAt,
      status: solicitation.status,
      formId: solicitation.formId,
      form: solicitation.form,
    }
  }
}
