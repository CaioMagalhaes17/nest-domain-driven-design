import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MangooseSchema } from "mongoose"

@Schema({ timestamps: true })
export class Budget extends Document {
  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "StoreProfile" })
  storeProfileId: MangooseSchema.Types.ObjectId

  @Prop({ required: true })
  startValue: string

  @Prop({ required: true })
  endValue: string

  @Prop()
  details: string

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "Solicitation" })
  solicitationId: MangooseSchema.Types.ObjectId
}

export const BudgetSchema = SchemaFactory.createForClass(Budget)
