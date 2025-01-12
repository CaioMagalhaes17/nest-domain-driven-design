import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export class SubscriptionPlans extends Document {
  @Prop({ required: true })
  planName: string

  @Prop({ required: true })
  price: number
}

export const SubscriptionPlansSchema =
  SchemaFactory.createForClass(SubscriptionPlans)
