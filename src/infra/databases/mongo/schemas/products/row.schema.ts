import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class ProductsRow extends Document {
  @Prop({ required: true })
  storeProfileId: string

  @Prop({ required: true })
  name: string

  @Prop()
  isActive: boolean
}

export const ProductsRowSchema = SchemaFactory.createForClass(ProductsRow)
