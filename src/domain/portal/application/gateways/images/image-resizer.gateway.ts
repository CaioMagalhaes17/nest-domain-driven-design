export abstract class ImageResizerGateway {
  abstract resizeImage(
    filePath: string,
    width: number,
    height: number,
  ): Promise<string>
}
