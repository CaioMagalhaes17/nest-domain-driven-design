import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class StoreContacts extends Document {
  @Prop()
  email: string

  @Prop()
  telNum: string

  @Prop()
  description: string

  @Prop()
  main: boolean

  @Prop({ required: true })
  storeProfileId: string

  @Prop({ required: true })
  wppNum: string
}

export const StoreContactsSchema = SchemaFactory.createForClass(StoreContacts)
