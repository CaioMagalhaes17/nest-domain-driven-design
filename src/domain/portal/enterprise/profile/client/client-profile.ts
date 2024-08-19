import { BaseEntity } from "src/core/entities/base-entity"

type ClientProfileProps = {
  name: string
  address: string
  preferredMapRadiusId: number
  profileImg: string
  rating: number
  userId: number
}

export class ClientProfile extends BaseEntity<ClientProfileProps> {
  static create(props: ClientProfileProps, id: number) {
    return new ClientProfile(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get address(): string {
    return this.props.address
  }

  get preferredMapRadiusId(): number {
    return this.props.preferredMapRadiusId
  }

  get profileImg(): string {
    return this.props.profileImg
  }

  get rating(): number {
    return this.props.rating
  }

  get userId(): number {
    return this.props.userId
  }
}
