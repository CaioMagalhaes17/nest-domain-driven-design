import { BaseEntity } from "src/core/entities/base-entity"
import { BudgetStatusType } from "../../application/types/repair/budget/status"

type BudgetProps = {
  userId: number
  estimatedPrice: string
  solicitationId: string
  status: BudgetStatusType
  createdAt: string
  updatedAt: string
}

export class Budget extends BaseEntity<BudgetProps> {
  static create(props: BudgetProps, id: number) {
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

  get status(): BudgetStatusType {
    return this.props.status
  }

  get createdAt(): string {
    return this.props.createdAt
  }

  get updatedAt(): string {
    return this.props.updatedAt
  }
}
