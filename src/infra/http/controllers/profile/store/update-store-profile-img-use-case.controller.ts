import { UpdateStoreProfileImgUseCase } from "@/domain/portal/application/use-cases/profile/store/update-store-profile-img-use-case"
import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"
import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { extname, join } from "path"
import { v4 as uuid } from "uuid"

@Controller()
export class UpdateStoreProfileImgUseCaseController {
  constructor(
    private updateStoreProfileImgUseCase: UpdateStoreProfileImgUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("/profile/store/profileImg")
  @UseInterceptors(
    FileInterceptor("file", {
      // Configurações do Multer
      storage: diskStorage({
        destination: "./uploads/imgs", // Pasta onde o arquivo será armazenado
        filename: (req, file, callback) => {
          const uniqueSuffix = uuid() + extname(file.originalname)
          callback(null, uniqueSuffix) // Nome do arquivo salvo
        },
      }),
    }),
  )
  async handle(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { profileId: string } },
  ) {
    const imagePaths = join(
      __dirname,
      "../../../../../../uploads/imgs/" + file.filename,
    )
    return this.updateStoreProfileImgUseCase.execute(
      req.user.profileId,
      imagePaths,
      file.filename,
    )
  }
}
