import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class PhoneForm {
  @Prop({ required: true })
  brand: string

  @Prop({ required: true })
  model: string

  @Prop({ required: true })
  originalHardware: string

  @Prop({ required: true })
  previousRepair: string

  @Prop({ required: true })
  usageTime: string
}

export const PhoneFormSchema = SchemaFactory.createForClass(PhoneForm)

@Schema()
export class BatteryForm {
  @Prop()
  "battery-A": string

  @Prop()
  "battery-B": string

  @Prop()
  "battery-C": string

  @Prop()
  "battery-D": string

  @Prop()
  "battery-E": string

  @Prop()
  "battery-F": string
}

export const BatteryFormSchema = SchemaFactory.createForClass(BatteryForm)

@Schema()
export class DisplayForm {
  @Prop()
  "display-A": string

  @Prop()
  "display-B": string

  @Prop()
  "display-C": string

  @Prop()
  "display-D": string

  @Prop()
  "display-E": string

  @Prop()
  "display-F": string
}

export const DisplayFormSchema = SchemaFactory.createForClass(DisplayForm)

@Schema({ timestamps: true })
export class SolicitationForm extends Document {
  @Prop({ required: true })
  problemTopic: string

  @Prop({ type: Object, required: true })
  problemForm: DisplayForm | BatteryForm

  @Prop({ type: PhoneFormSchema, required: true })
  phoneForm: PhoneForm

  @Prop({ required: true })
  deliveryPreference: string

  @Prop({ required: true })
  timePreference: string

  @Prop({ required: true })
  details: string

  @Prop()
  solicitationImgs: string[]
}

export const SolicitationFormSchema =
  SchemaFactory.createForClass(SolicitationForm)
