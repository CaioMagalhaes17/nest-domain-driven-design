import { BaseEntity } from "src/core/entities/base-entity"
import { SolicitationForm } from "./solicitation.form"

type SolicitationProps = {
  userId: string
  createdAt: string
  updatedAt: string
  status: string
  form: SolicitationForm
  formId: string
}

export class Solicitation extends BaseEntity<SolicitationProps> {
  static create(props: SolicitationProps, id: string) {
    return new Solicitation(props, id)
  }

  get userId(): string {
    return this.props.userId
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }

  get status(): string {
    return this.props.status
  }

  get form(): SolicitationForm {
    return this.props.form
  }

  get formId(): string {
    return this.props.formId
  }
}
