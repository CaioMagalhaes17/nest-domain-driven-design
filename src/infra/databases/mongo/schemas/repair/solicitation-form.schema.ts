import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class SolicitationForm extends Document {
  @Prop({ required: true })
  brand: string

  @Prop({ required: true })
  modelo: string

  @Prop({ required: true })
  imeiNumber: string

  @Prop({ required: true })
  usageTime: string

  @Prop({ required: true })
  problemDescription: string

  @Prop({ required: true })
  problemCause: string

  @Prop({ required: true })
  previousRepair: string

  @Prop({ required: true })
  originalHardware: string
}

export const SolicitationFormSchema =
  SchemaFactory.createForClass(SolicitationForm)
