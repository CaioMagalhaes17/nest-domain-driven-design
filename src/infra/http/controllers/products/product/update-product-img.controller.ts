import { UpdateProductImgUseCase } from "@/domain/portal/application/use-cases/products/product/update-product-img"
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
export class UpdateProductImgUseCaseController {
  constructor(private updateProductImgUseCase: UpdateProductImgUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post("/product/img")
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
    return this.updateProductImgUseCase.execute(
      req.user.profileId,
      imagePaths,
      file.filename,
    )
  }
}
