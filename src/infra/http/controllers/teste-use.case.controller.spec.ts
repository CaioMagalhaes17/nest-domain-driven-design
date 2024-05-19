import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { HttpModule } from '../http.module';
import { TesteController } from './fetch-solicitations-use-case.controller';
import { TesteUseCase } from '../../../domain/portal/application/use-cases/fetch-solicitations-use-case';
import { TesteRepository } from '../../../domain/portal/application/repositories/solicitation-repository';
import { DataBaseModule } from '../../databases/database.module';

describe('TesteUseCaseController', () => {
  let app: INestApplication
  let controller: TesteController

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = app.get<TesteController>(TesteController)
  });

  it('should return string', async () => {
    expect(await controller.handle()).toEqual('oieeeer')
  })
});
