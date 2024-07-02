import { BaseEntity } from "src/core/entities/base-entity"
import { SolicitationForm } from "./solicitation.form"

type SolicitationProps = {
  userId: string
  createdAt: string
  updatedAt: string
  status: string
  formId: number
  form: SolicitationForm
}

export class Solicitation extends BaseEntity<SolicitationProps> {
  static create(props: SolicitationProps, id: number) {
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

  get formId(): number {
    return this.props.formId
  }

  get form(): SolicitationForm {
    return this.props.form
  }
}
