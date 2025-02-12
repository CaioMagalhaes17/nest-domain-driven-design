import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MangooseSchema } from "mongoose"

@Schema({ timestamps: true })
export class Feedback extends Document {
  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  rating: number

  @Prop()
  storeAnswer: number

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "ClientProfile" })
  clientProfileId: MangooseSchema.Types.ObjectId

  @Prop({ type: MangooseSchema.Types.ObjectId, ref: "StoreProfile" })
  storeProfileId: MangooseSchema.Types.ObjectId
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)
