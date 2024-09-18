import { BaseEntity } from "src/core/entities/base-entity"

type StoreProfileProps = {
  name: string
  address: string
  preferredMapRadiusId: number
  profileImg: string
  rating: number
  bio: string
  typeSubscriptionId: number
  userId: number
}

export class StoreProfile extends BaseEntity<StoreProfileProps> {
  static create(props: StoreProfileProps, id: number) {
    return new StoreProfile(props, id)
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

  get bio(): string {
    return this.props.bio
  }

  get typeSubscriptionId(): number {
    return this.props.typeSubscriptionId
  }

  get userId(): number {
    return this.props.userId
  }
}
