import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"
import { BaseImagesUrlFactory } from "@/infra/factory/base-images-url.factory"
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { extname } from "path"
import { v4 as uuid } from "uuid"

@Controller()
export class CreateImagesToSolicitationUseCaseController {
  constructor(private baseImagesUrlFactory: BaseImagesUrlFactory) {}
  @UseGuards(JwtAuthGuard)
  @Post("/solicitation/image")
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
  async handle(@UploadedFile() file: Express.Multer.File) {
    return {
      url: this.baseImagesUrlFactory.get() + file.filename,
      status: "ok",
    }
  }
}
