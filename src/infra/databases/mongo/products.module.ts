import { Module } from "@nestjs/common"
import { getModelToken, MongooseModule } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Product, ProductSchema } from "./schemas/products/product.schema"
import { ProductsRow, ProductsRowSchema } from "./schemas/products/row.schema"
import { ProductMapper } from "./mappers/products/product.mapper"
import { ProductsRowMapper } from "./mappers/products/products-row.mapper"
import { InfraProductRepository } from "./repositories/products/product.repository"
import { InfraProductsRowRepository } from "./repositories/products/products-row.repository"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ProductsRow.name, schema: ProductsRowSchema },
    ]),
  ],
  providers: [
    ProductsRowMapper,
    ProductMapper,
    {
      provide: InfraProductRepository,
      useFactory: (model: Model<Product>, mapper: ProductMapper) => {
        return new InfraProductRepository(model, mapper)
      },
      inject: [getModelToken(Product.name), ProductMapper],
    },
    {
      provide: InfraProductsRowRepository,
      useFactory: (model: Model<ProductsRow>, mapper: ProductsRowMapper) => {
        return new InfraProductsRowRepository(model, mapper)
      },
      inject: [getModelToken(ProductsRow.name), ProductsRowMapper],
    },
  ],
  exports: [InfraProductRepository, InfraProductsRowRepository],
})
export class ProductsMongoModule {}
