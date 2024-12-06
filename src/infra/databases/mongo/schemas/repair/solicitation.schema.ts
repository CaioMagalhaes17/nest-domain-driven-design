import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MangooseSchema } from "mongoose"

@Schema({ timestamps: true })
export class Solicitation extends Document {
  @Prop({ required: true })
  status: string

  @Prop()
  userId: number

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "SolicitationForm" })
  solicitation_form: MangooseSchema.Types.ObjectId
}

export const SolicitationSchema = SchemaFactory.createForClass(Solicitation)
