import { BaseEntity } from "src/core/entities/base-entity"

type StoreProfileProps = {
  name: string
  address: string
  profileImg: string
  rating?: number
  description: string
  userId: string
  email: string
  telNum: string
}

export class StoreProfile extends BaseEntity<StoreProfileProps> {
  static create(props: StoreProfileProps, id: string) {
    return new StoreProfile(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get address(): string {
    return this.props.address
  }

  get profileImg(): string {
    return this.props.profileImg
  }

  get rating(): number {
    return this.props.rating
  }

  get description(): string {
    return this.props.description
  }

  get userId(): string {
    return this.props.userId
  }

  get email(): string {
    return this.props.email
  }

  get telNum(): string {
    return this.props.telNum
  }
}
