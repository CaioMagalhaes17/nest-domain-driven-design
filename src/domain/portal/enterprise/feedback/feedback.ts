import { BaseEntity } from "@/core/entities/base-entity"
import { ClientProfile } from "../profile/client/client-profile"
import { StoreProfile } from "../profile/store/store-profile"

export interface FeedbackProps {
  description: string
  rating: number
  clientProfileId: string
  clientProfile: ClientProfile
  storeProfileId: string
  storeProfile: StoreProfile
  storeAnswer?: string
  createdAt: string
  updatedAt: string
}
export class Feedback extends BaseEntity<FeedbackProps> {
  static create(props: FeedbackProps, id: string) {
    return new Feedback(props, id)
  }

  get clientProfile(): ClientProfile {
    return this.props.clientProfile
  }

  get storeProfileId(): string {
    return this.props.storeProfileId
  }

  get storeProfile(): StoreProfile {
    return this.props.storeProfile
  }

  get description(): string {
    return this.props.description
  }

  get rating(): number {
    return this.props.rating
  }

  get clientProfileId(): string {
    return this.props.clientProfileId
  }

  get storeAnswer(): string {
    return this.props.storeAnswer
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }
}
