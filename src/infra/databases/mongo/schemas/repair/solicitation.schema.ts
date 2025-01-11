import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MangooseSchema } from "mongoose"

@Schema({ timestamps: true })
export class Solicitation extends Document {
  @Prop({ required: true })
  status: string

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "ClientProfile" })
  clientProfileId: MangooseSchema.Types.ObjectId

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "SolicitationForm" })
  solicitationFormId: MangooseSchema.Types.ObjectId
}

export const SolicitationSchema = SchemaFactory.createForClass(Solicitation)
