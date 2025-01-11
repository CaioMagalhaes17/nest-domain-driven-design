import { BaseEntity } from "src/core/entities/base-entity"
import { SolicitationForm } from "./solicitation.form"
import { ClientProfile } from "../profile/client/client-profile"

type SolicitationProps = {
  userId: string
  createdAt: string
  updatedAt: string
  status: string
  form: SolicitationForm
  solicitationFormId: string
  clientProfile: ClientProfile
  clientProfileId: string
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

  get solicitationFormId(): string {
    return this.props.solicitationFormId
  }

  get clientProfile(): ClientProfile {
    return this.props.clientProfile
  }

  get clientProfileId(): string {
    return this.props.clientProfileId
  }
}
