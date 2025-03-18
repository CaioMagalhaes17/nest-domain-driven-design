import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  message: string

  @Prop({ required: true })
  senderName: string

  @Prop({ required: true })
  profileId: string
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
