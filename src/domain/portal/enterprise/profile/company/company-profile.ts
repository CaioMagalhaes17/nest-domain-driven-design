import { BaseEntity } from "src/core/entities/base-entity"

type CompanyProfileProps = {
  name: string
  address: string
  preferredMapRadiusId: number
  profileImg: string
  rating: number
  bio: string
  typeSubscriptionId: number
  userId: number
}

export class CompanyProfile extends BaseEntity<CompanyProfileProps> {
  static create(props: CompanyProfileProps, id: number) {
    return new CompanyProfile(props, id)
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

  get bio(): string {
    return this.bio
  }

  get typeSubscriptionId(): string {
    return this.typeSubscriptionId
  }

  get userId(): number {
    return this.userId
  }
}
