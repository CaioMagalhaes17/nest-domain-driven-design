import { BaseEntity } from "src/core/entities/base-entity"
import { SolicitationFormDTO } from "../../application/dto/solicitation-form.dto"

type SolicitationProps = {
  userId: string
  createdAt: string
  updatedAt: string
  status: string
  formId: number
  form: SolicitationFormDTO
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

  get form(): SolicitationFormDTO {
    return this.props.form
  }
}
