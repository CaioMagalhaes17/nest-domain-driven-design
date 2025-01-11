import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class StoreProfile extends Document {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  profileImg: string

  @Prop()
  rating: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  telNum: string

  @Prop({ required: true })
  address: string

  @Prop()
  subscriptionId: string

  @Prop({ required: true })
  description: string
}

export const StoreProfileSchema = SchemaFactory.createForClass(StoreProfile)
