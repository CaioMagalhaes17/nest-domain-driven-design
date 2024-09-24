import { BaseEntity } from "src/core/entities/base-entity"

type SolicitationFormProps = {
  brand: string
  model: string
  imeiNumber: string
  usageTime: string
  problemDescription: string
  problemCause: string
  previousRepair: string
  originalHardware: boolean
  solicitationId: number
}

export class SolicitationForm extends BaseEntity<SolicitationFormProps> {
  static create(props: SolicitationFormProps, id: number) {
    return new SolicitationForm(props, id)
  }

  get brand(): string {
    return this.props.brand
  }

  get model(): string {
    return this.props.model
  }

  get imeiNumber(): string {
    return this.props.imeiNumber
  }

  get usageTime(): string {
    return this.props.usageTime
  }

  get problemDescription(): string {
    return this.props.problemDescription
  }

  get problemCause(): string {
    return this.props.problemCause
  }

  get previousRepair(): string {
    return this.props.previousRepair
  }

  get originalHardware(): boolean {
    return this.props.originalHardware
  }

  get solicitationId(): number {
    return this.props.solicitationId
  }
}
