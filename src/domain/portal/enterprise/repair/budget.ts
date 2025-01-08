import { BaseEntity } from "src/core/entities/base-entity"
import { BudgetStatusType } from "../../application/types/repair/budget/status"
import { Solicitation } from "./solicitation"

type BudgetProps = {
  userId: number
  estimatedPrice: string
  solicitationId: string
  status: BudgetStatusType
  createdAt: string
  updatedAt: string
  solicitation: Solicitation
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
}
