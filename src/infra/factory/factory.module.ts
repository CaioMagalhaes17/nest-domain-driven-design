import { Global, Module } from "@nestjs/common"
import { BaseUrlFactory } from "./base-url.factory"
import { BaseImagesUrlFactory } from "./base-images-url.factory"

@Global()
@Module({
  providers: [BaseUrlFactory, BaseImagesUrlFactory],
  exports: [BaseUrlFactory, BaseImagesUrlFactory],
})
export class FactoryModule {}
