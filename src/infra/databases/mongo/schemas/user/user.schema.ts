import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  login: string

  @Prop()
  password: string

  @Prop({ required: true })
  isStore: boolean

  @Prop()
  permission: string

  @Prop()
  subscriptionPlanId: string
}

export const UserSchema = SchemaFactory.createForClass(User)
