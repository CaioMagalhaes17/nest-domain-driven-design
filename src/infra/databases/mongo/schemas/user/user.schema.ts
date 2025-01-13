import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  login: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  isStore: boolean

  @Prop({ required: true })
  permission: string

  @Prop()
  subscriptionPlanId: string
}

export const UserSchema = SchemaFactory.createForClass(User)
