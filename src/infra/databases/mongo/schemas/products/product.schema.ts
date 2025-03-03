import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  storeProfileId: string

  @Prop({ required: true })
  name: string

  @Prop()
  productImg: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  rowId: string

  @Prop({ required: true })
  price: string

  @Prop({ required: true })
  category: string

  @Prop()
  isActive: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product)
