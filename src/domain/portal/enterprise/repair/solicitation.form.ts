import { BaseEntity } from "src/core/entities/base-entity"

export type SolicitationFormProps = {
  problemTopic: "battery" | "display"
  problemForm: BatteryFormType | DisplayFormType
  phoneForm: PhoneFormType
  deliveryPreference: string
  timePreference: string
  details: string
  solicitationImgs: string[]
}

export type PhoneFormType = {
  brand: string
  model: string
  previousRepair: string
  originalHardware: string
  usageTime: string
}

export type BatteryFormType = {
  "battery-A": "battery-A-1" | "battery-A-2" | "battery-A-3" | "battery-A-4"
  "battery-B": "battery-B-1" | "battery-B-2" | "battery-B-3"
  "battery-C": "battery-C-1" | "battery-C-2" | "battery-C-3"
  "battery-D": "battery-D-1" | "battery-D-2" | "battery-D-3"
  "battery-E": "battery-E-1" | "battery-E-2" | "battery-E-3"
  "battery-F": "battery-F-1" | "battery-F-2" | "battery-F-3"
}

export type DisplayFormType = {
  "display-A": "display-A-1" | "display-A-2" | "display-A-3" | "display-A-4"
  "display-B": "display-B-1" | "display-B-2" | "display-B-3"
  "display-C": "display-C-1" | "display-C-2" | "display-C-3"
  "display-D": "display-D-1" | "display-D-2"
  "display-E": "display-E-1" | "display-E-2" | "display-E-3"
  "display-F": "display-F-1" | "display-F-2" | "display-F-3"
}

export type ProblemTopicType = "battery" | "display"

export class SolicitationForm extends BaseEntity<SolicitationFormProps> {
  static create(props: SolicitationFormProps, id: string) {
    return new SolicitationForm(props, id)
  }

  get problemTopic(): ProblemTopicType {
    return this.props.problemTopic
  }

  get problemForm(): BatteryFormType | DisplayFormType {
    return this.props.problemForm
  }

  get phoneForm(): PhoneFormType {
    return this.props.phoneForm
  }

  get deliveryPreference(): string {
    return this.props.deliveryPreference
  }

  get timePreference(): string {
    return this.props.timePreference
  }

  get details(): string {
    return this.props.details
  }

  get solicitationImgs(): string[] {
    return this.props.solicitationImgs
  }
}
