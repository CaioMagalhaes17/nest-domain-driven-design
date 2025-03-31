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
  tags: string[]

  @Prop()
  workingTime: string

  @Prop()
  rating: number

  @Prop({ required: true })
  address: string

  @Prop()
  description: string
}

export const StoreProfileSchema = SchemaFactory.createForClass(StoreProfile)
