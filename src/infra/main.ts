import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { BaseFrontendUrlFactory } from "./factory/base-frontend-url.factory"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const baseUrlFactory = app.get(BaseFrontendUrlFactory)
  const frontendUrl = baseUrlFactory.get()

  app.enableCors({
    origin: frontendUrl, // Origem permitida (URL do seu frontend)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
    credentials: true, // Permitir cookies ou headers com credenciais
  })

  await app.listen(3001)
}
bootstrap()
