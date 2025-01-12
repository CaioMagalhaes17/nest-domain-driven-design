import { BaseEntity } from "src/core/entities/base-entity"
import { BudgetStatusType } from "../../application/types/repair/budget/status"
import { Solicitation } from "./solicitation"
import { StoreProfile } from "../profile/store/store-profile"

type BudgetProps = {
  userId: number
  estimatedPrice: string
  solicitationId: string
  status: BudgetStatusType
  createdAt: string
  updatedAt: string
  solicitation: Solicitation
  storeProfileId: string
  storeProfile: StoreProfile
}

export class Budget extends BaseEntity<BudgetProps> {
  static create(props: BudgetProps, id: string) {
    return new Budget(props, id)
  }

  get userId(): number {
    return this.props.userId
  }

  get estimatedPrice(): string {
    return this.props.estimatedPrice
  }

  get solicitationId(): string {
    return this.props.solicitationId
  }

  get solicitation(): Solicitation {
    return this.props.solicitation
  }

  get status(): BudgetStatusType {
    return this.props.status
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
}
