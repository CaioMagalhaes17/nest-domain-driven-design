import { BaseEntity } from "src/core/entities/base-entity"

type ClientProfileProps = {
  name: string
  userId: string
  email?: string
  telNumber?: string
}

export class ClientProfile extends BaseEntity<ClientProfileProps> {
  static create(props: ClientProfileProps, id: string) {
    return new ClientProfile(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get userId(): string {
    return this.props.userId
  }

  get email(): string {
    return this.props.email
  }

  get telNumber(): string {
    return this.props.telNumber
  }
}
