import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class SolicitationForm extends Document {
  @Prop({ required: true })
  brand: string

  @Prop({ required: true })
  modelo: string

  @Prop({ required: true })
  imei_num: string

  @Prop({ required: true })
  usage_time: string

  @Prop({ required: true })
  problem_desc: string

  @Prop({ required: true })
  problem_cause: string

  @Prop({ required: true })
  previous_repair: string

  @Prop({ required: true })
  original_hardware: string
}

export const SolicitationFormSchema =
  SchemaFactory.createForClass(SolicitationForm)
