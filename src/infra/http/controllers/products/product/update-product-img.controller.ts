import { UpdateProductImgUseCase } from "@/domain/portal/application/use-cases/products/product/update-product-img"
import { JwtAuthGuard } from "@/infra/auth/guards/jwt.guard"
import { BaseImagesUrlFactory } from "@/infra/factory/base-images-url.factory"
import {
  Controller,
  Param,
  Post,
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
  constructor(
    private updateProductImgUseCase: UpdateProductImgUseCase,
    private baseImagesUrlFactory: BaseImagesUrlFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("/product/img/:id")
  @UseInterceptors(
    FileInterceptor("file", {
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
    @Param("id") id: string,
  ) {
    const imagePaths = join(
      __dirname,
      "../../../../../../uploads/imgs/" + file.filename,
    )
    return this.updateProductImgUseCase.execute(
      id,
      imagePaths,
      file.filename,
      this.baseImagesUrlFactory.get(),
    )
  }
}
