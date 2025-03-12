import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class ClientProfile extends Document {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  name: string

  @Prop()
  email: string

  @Prop()
  telNum: string
}

export const ClientProfileSchema = SchemaFactory.createForClass(ClientProfile)
