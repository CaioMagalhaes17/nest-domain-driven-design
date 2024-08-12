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
    return this.name
  }

  get address(): string {
    return this.address
  }

  get preferredMapRadiusId(): string {
    return this.preferredMapRadiusId
  }

  get profileImg(): string {
    return this.profileImg
  }

  get rating(): string {
    return this.rating
  }

  get userId(): number {
    return this.userId
  }
}
