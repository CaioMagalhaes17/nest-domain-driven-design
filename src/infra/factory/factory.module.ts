import { Global, Module } from "@nestjs/common"
import { BaseUrlFactory } from "./base-url.factory"
import { BaseImagesUrlFactory } from "./base-images-url.factory"
import { BaseFrontendUrlFactory } from "./base-frontend-url.factory"
import { MongoSrvUrlFactory } from "./mongo-srv.factory"

@Global()
@Module({
  providers: [
    BaseUrlFactory,
    BaseImagesUrlFactory,
    BaseFrontendUrlFactory,
    MongoSrvUrlFactory,
  ],
  exports: [
    BaseUrlFactory,
    BaseImagesUrlFactory,
    BaseFrontendUrlFactory,
    MongoSrvUrlFactory,
  ],
})
export class FactoryModule {}
