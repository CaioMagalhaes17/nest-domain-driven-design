import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MangooseSchema } from "mongoose"

@Schema({ timestamps: true })
export class Budget extends Document {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  estimatedPrice: string

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "Solicitation" })
  solicitation: MangooseSchema.Types.ObjectId
}

export const BudgetSchema = SchemaFactory.createForClass(Budget)
