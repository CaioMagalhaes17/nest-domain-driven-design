import { ImageResizerGateway } from "../../../gateways/images/image-resizer.gateway"
import { IProductRepository } from "../../../repositories/products/product-repository"

export class UpdateProductImgUseCase {
  constructor(
    private imageResizer: ImageResizerGateway,
    private productRepository: IProductRepository,
  ) {}

  async execute(storeProfileId: string, imagePath: string, fileName: string) {
    await this.imageResizer.resizeImage(imagePath, 300, 300)
    const urlBase = "http://localhost:3001/uploads/imgs/"
    const cleanFile = fileName.replace(".png", "")
    await this.productRepository.updateById(storeProfileId, {
      productImg: urlBase + cleanFile + "_resized.png",
    })

    return { url: urlBase + cleanFile + "_resized.png", status: "ok" }
  }
}
