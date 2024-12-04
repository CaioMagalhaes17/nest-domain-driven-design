import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Sequelize } from "sequelize-typescript"
import * as request from "supertest"
import { SolicitationDatabaseModule } from "../../../../src/infra/databases/solicitation-database.module"
import { Solicitation } from "../../../../src/infra/databases/sequelize/model/repair/solicitation.model"
import { SolicitationForm } from "../../../../src/infra/databases/sequelize/model/repair/form.model"

describe("SolicitationController (e2e)", () => {
  let app: INestApplication
  let sequelize: Sequelize

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SolicitationDatabaseModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(new ValidationPipe()) // Validação global para os DTOs

    await app.init()

    sequelize = moduleFixture.get(Sequelize)

    // Sincronizar o banco de dados (SQLite em memória para testes)
    await sequelize.addModels([Solicitation, SolicitationForm])
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close() // Fechar a conexão após os testes
    await app.close()
  })

  it("/solicitations (POST) - Deve criar uma solicitação", async () => {
    const payload = {
      fk_id_user: 1,
      solicitation_form_id: 1,
      description: "Solicitação de teste",
    }

    const response = await request(app.getHttpServer())
      .post("/solicitations") // Substitua pela sua rota
      .send(payload)
      .expect(201)

    console.log(response.body)
    // // Validar a resposta da API
    // expect(response.body).toMatchObject({
    //   id: expect.any(Number),
    //   fk_id_user: 1,
    //   description: "Solicitação de teste",
    // })

    // // Validar se os dados foram persistidos no banco
    // const solicitations = await Solicitation.findAll()
    // expect(solicitations.length).toBe(1)
    // expect(solicitations[0].description).toBe("Solicitação de teste")
  })
})
