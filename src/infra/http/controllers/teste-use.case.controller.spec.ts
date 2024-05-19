import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { HttpModule } from '../http.module';
import { TesteController } from './teste-use-case.controller';
import { TesteUseCase } from '../../../domain/portal/application/use-cases/teste-use-case';
import { TesteRepository } from '../../../domain/portal/application/repositories/teste-repository';
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
