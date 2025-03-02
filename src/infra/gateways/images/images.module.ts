import { ImageResizerGateway } from "@/domain/portal/application/gateways/images/image-resizer.gateway"
import { Module } from "@nestjs/common"
import { ImageResizerService } from "./image-resizer.service"

@Module({
  providers: [
    {
      provide: ImageResizerGateway,
      useClass: ImageResizerService,
    },
  ],
  exports: [ImageResizerGateway],
})
export class ImagesModule {}
