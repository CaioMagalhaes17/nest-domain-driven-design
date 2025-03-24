import { Global, Module } from "@nestjs/common"
import { BaseUrlFactory } from "./base-url.factory"
import { BaseImagesUrlFactory } from "./base-images-url.factory"
import { BaseFrontendUrlFactory } from "./base-frontend-url.factory"

@Global()
@Module({
  providers: [BaseUrlFactory, BaseImagesUrlFactory, BaseFrontendUrlFactory],
  exports: [BaseUrlFactory, BaseImagesUrlFactory, BaseFrontendUrlFactory],
})
export class FactoryModule {}
