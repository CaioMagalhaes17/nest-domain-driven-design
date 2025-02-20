import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class StoreSocials extends Document {
  @Prop({ required: true })
  type: string

  @Prop()
  link: string

  @Prop({ required: true })
  storeProfileId: string
}

export const StoreSocialsSchema = SchemaFactory.createForClass(StoreSocials)
