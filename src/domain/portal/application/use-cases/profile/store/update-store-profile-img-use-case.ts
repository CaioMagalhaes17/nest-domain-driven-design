import { ImageResizerGateway } from "../../../gateways/images/image-resizer.gateway"
import { IStoreProfileRepository } from "../../../repositories/profile/store/store-profile.repository"

export class UpdateStoreProfileImgUseCase {
  constructor(
    private imageResizer: ImageResizerGateway,
    private storeProfileRepository: IStoreProfileRepository,
  ) {}

  async execute(
    profileId: string,
    imagePath: string,
    fileName: string,
    urlBase: string,
  ) {
    await this.imageResizer.resizeImage(imagePath, 400, 400)
    const cleanFile = fileName.replace(".png", "")
    await this.storeProfileRepository.updateById(profileId, {
      profileImg: urlBase + cleanFile + "_resized.png",
    })

    return { url: urlBase + cleanFile + "_resized.png", status: "ok" }
  }
}
