import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: false })
export class Geolocation extends Document {
  @Prop({
    type: {
      type: String,
      enum: ["Point"], // O tipo deve ser "Point" para GeoJSON
      required: true,
    },
    coordinates: {
      type: [Number], // Array de números: [longitude, latitude]
      required: true,
    },
  })
  location: {
    type: string // Sempre "Point"
    coordinates: [number, number] // [longitude, latitude]
  }

  @Prop({ required: true })
  radius: number

  @Prop({ required: true })
  profileId: string
}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation)

// Adiciona o índice geoespacial 2dsphere
GeolocationSchema.index({ location: "2dsphere" })
