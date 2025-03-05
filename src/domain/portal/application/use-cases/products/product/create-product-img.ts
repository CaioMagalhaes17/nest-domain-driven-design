import { ImageResizerGateway } from "../../../gateways/images/image-resizer.gateway"

export class CreateProductImgUseCase {
  constructor(private imageResizer: ImageResizerGateway) {}

  async execute(imagePath: string, fileName: string) {
    await this.imageResizer.resizeImage(imagePath, 400, 400)
    const urlBase = "http://localhost:3001/uploads/imgs/"
    const cleanFile = fileName.replace(".png", "")

    return { url: urlBase + cleanFile + "_resized.png", status: "ok" }
  }
}
