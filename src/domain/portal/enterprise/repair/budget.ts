import { BaseEntity } from "src/core/entities/base-entity"
import { Solicitation } from "./solicitation"
import { StoreProfile } from "../profile/store/store-profile"

type BudgetProps = {
  userId: number
  startValue: string
  endValue: string
  details: string
  solicitationId: string
  createdAt: string
  updatedAt: string
  solicitation: Solicitation
  storeProfileId: string
  storeProfile: StoreProfile
  estimatedTime: string
}

export class Budget extends BaseEntity<BudgetProps> {
  static create(props: BudgetProps, id: string) {
    return new Budget(props, id)
  }

  get userId(): number {
    return this.props.userId
  }

  get startValue(): string {
    return this.props.startValue
  }

  get endValue(): string {
    return this.props.endValue
  }

  get details(): string {
    return this.props.details
  }

  get solicitationId(): string {
    return this.props.solicitationId
  }

  get solicitation(): Solicitation {
    return this.props.solicitation
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }

  get storeProfileId(): string {
    return this.props.storeProfileId
  }

  get storeProfile(): StoreProfile {
    return this.props.storeProfile
  }

  get estimatedTime(): string {
    return this.props.estimatedTime
  }
}
