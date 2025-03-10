import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"
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
      url: "http://localhost:3001/uploads/imgs/" + file.filename,
      status: "ok",
    }
  }
}
