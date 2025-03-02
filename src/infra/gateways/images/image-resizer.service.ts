import { Injectable } from "@nestjs/common"
import * as sharp from "sharp"

@Injectable()
export class ImageResizerService {
  async resizeImage(filePath: string, width: number, height: number) {
    const resizedImagePath = filePath.replace(/(\.\w+)$/, `_resized$1`)
    await sharp(filePath)
      .resize(width, height) // Define o tamanho desejado
      .toFile(resizedImagePath)

    return resizedImagePath
  }
}
