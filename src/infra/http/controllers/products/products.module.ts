import { IProductRepository } from "@/domain/portal/application/repositories/products/product-repository"
import { IProductsRowRepository } from "@/domain/portal/application/repositories/products/products-row.repository"
import { CreateProductUseCase } from "@/domain/portal/application/use-cases/products/product/create-product"
import { DeleteProductUseCase } from "@/domain/portal/application/use-cases/products/product/delete-product"
import { FetchProductUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-product"
import { FetchProductsUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-products"
import { UpdateProductUseCase } from "@/domain/portal/application/use-cases/products/product/update-product"
import { CreateProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/create-products-row"
import { DeleteProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/delete-products-row"
import { FetchProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/fetch-products-row"
import { FetchProductsRowsUseCase } from "@/domain/portal/application/use-cases/products/row/fetch-products-rows"
import { UpdateProductsRowUseCase } from "@/domain/portal/application/use-cases/products/row/update-products-row"
import { ProductsMongoModule } from "@/infra/databases/mongo/products.module"
import { InfraProductRepository } from "@/infra/databases/mongo/repositories/products/product.repository"
import { InfraProductsRowRepository } from "@/infra/databases/mongo/repositories/products/products-row.repository"
import { ImagesModule } from "@/infra/gateways/images/images.module"
import { Module } from "@nestjs/common"
import { CreateProductUseCaseController } from "./product/create-product.controller"
import { CreateProductsRowUseCaseController } from "./row/create-products-row.controller"
import { FetchProductsRowsUseCaseController } from "./row/fetch-products-rows.controller"
import { FetchProductUseCaseController } from "./product/fetch-product.controller"
import { FetchProductsUseCaseController } from "./product/fetch-products.controller"
import { DeleteProductUseCaseController } from "./product/delete-product.controller"
import { DeleteProductsRowUseCaseController } from "./row/delete-products-row.controller"
import { UpdateProductsRowUseCaseController } from "./row/update-products-row.controller"
import { UpdateProductUseCaseController } from "./product/update-product.controller"
import { UpdateProductImgUseCaseController } from "./product/update-product-img.controller"
import { UpdateProductImgUseCase } from "@/domain/portal/application/use-cases/products/product/update-product-img"
import { ImageResizerGateway } from "@/domain/portal/application/gateways/images/image-resizer.gateway"
import { FetchProductsRowUseCaseController } from "./row/fetch-products-row.controller"
import { FetchProductsByRowUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-products-by-row"
import { CreateProductImgUseCase } from "@/domain/portal/application/use-cases/products/product/create-product-img"
import { CreateProductImgUseCaseController } from "./product/create-product-img.controller"
import { FetchProductsByCategoryUseCaseController } from "./product/fetch-products-by-category.controller"
import { GeolocationModule } from "../geolocation/geolocation.module"
import { FetchStoresInsideClientRadiusUseCase } from "@/domain/portal/application/use-cases/geolocation/fetch-stores-inside-client-radius-use-case"
import { FetchProductsByCategoryUseCase } from "@/domain/portal/application/use-cases/products/product/fetch-products-by-category"
import { SearchProductsUseCase } from "@/domain/portal/application/use-cases/products/product/search-produtcs"
import { SearchProductsUseCaseController } from "./product/search-products-use-case.controller"

@Module({
  controllers: [
    SearchProductsUseCaseController,
    CreateProductUseCaseController,
    CreateProductsRowUseCaseController,
    FetchProductsRowUseCaseController,
    FetchProductsRowsUseCaseController,
    FetchProductUseCaseController,
    FetchProductsUseCaseController,
    DeleteProductUseCaseController,
    DeleteProductsRowUseCaseController,
    UpdateProductsRowUseCaseController,
    UpdateProductUseCaseController,
    UpdateProductImgUseCaseController,
    CreateProductImgUseCaseController,
    FetchProductsByCategoryUseCaseController,
  ],
  imports: [ProductsMongoModule, ImagesModule, GeolocationModule],
  providers: [
    {
      provide: CreateProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new CreateProductUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new UpdateProductUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: FetchProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new FetchProductUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: FetchProductsUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new FetchProductsUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new DeleteProductUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: DeleteProductsRowUseCase,
      useFactory: (productRepository: IProductsRowRepository) => {
        return new DeleteProductsRowUseCase(productRepository)
      },
      inject: [InfraProductsRowRepository],
    },
    {
      provide: UpdateProductsRowUseCase,
      useFactory: (productRepository: IProductsRowRepository) => {
        return new UpdateProductsRowUseCase(productRepository)
      },
      inject: [InfraProductsRowRepository],
    },
    {
      provide: CreateProductsRowUseCase,
      useFactory: (productRepository: IProductsRowRepository) => {
        return new CreateProductsRowUseCase(productRepository)
      },
      inject: [InfraProductsRowRepository],
    },
    {
      provide: FetchProductsRowUseCase,
      useFactory: (
        productRepository: IProductsRowRepository,
        fetchProductsByRowUseCase: FetchProductsByRowUseCase,
      ) => {
        return new FetchProductsRowUseCase(
          productRepository,
          fetchProductsByRowUseCase,
        )
      },
      inject: [InfraProductsRowRepository, FetchProductsByRowUseCase],
    },
    {
      provide: FetchProductsRowsUseCase,
      useFactory: (
        productRepository: IProductsRowRepository,
        fetchProductsByRowUseCase: FetchProductsByRowUseCase,
      ) => {
        return new FetchProductsRowsUseCase(
          productRepository,
          fetchProductsByRowUseCase,
        )
      },
      inject: [InfraProductsRowRepository, FetchProductsByRowUseCase],
    },
    {
      provide: FetchProductsByRowUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new FetchProductsByRowUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: UpdateProductImgUseCase,
      useFactory: (
        imageResizerGateway: ImageResizerGateway,
        productRepository: IProductRepository,
      ) => {
        return new UpdateProductImgUseCase(
          imageResizerGateway,
          productRepository,
        )
      },
      inject: [ImageResizerGateway, InfraProductRepository],
    },
    {
      provide: CreateProductImgUseCase,
      useFactory: (imageResizerGateway: ImageResizerGateway) => {
        return new CreateProductImgUseCase(imageResizerGateway)
      },
      inject: [ImageResizerGateway],
    },
    {
      provide: SearchProductsUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new SearchProductsUseCase(productRepository)
      },
      inject: [InfraProductRepository],
    },
    {
      provide: FetchProductsByCategoryUseCase,
      useFactory: (
        productRepository: IProductRepository,
        fetchStoreInsideClientRadius: FetchStoresInsideClientRadiusUseCase,
      ) => {
        return new FetchProductsByCategoryUseCase(
          productRepository,
          fetchStoreInsideClientRadius,
        )
      },
      inject: [InfraProductRepository, FetchStoresInsideClientRadiusUseCase],
    },
  ],
})
export class ProductsModule {}
