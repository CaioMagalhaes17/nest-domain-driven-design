import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export class SubscriptionPlan extends Document {
  @Prop({ required: true })
  planName: string

  @Prop({ required: true })
  price: number
}

export const SubscriptionPlanSchema =
  SchemaFactory.createForClass(SubscriptionPlan)
