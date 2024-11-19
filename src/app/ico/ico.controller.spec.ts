import { Test, TestingModule } from '@nestjs/testing';
import { IcoController } from './ico.controller';
import { IcoService } from './ico.service';

describe('IcoController', () => {
  let controller: IcoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcoController],
      providers: [IcoService],
    }).compile();

    controller = module.get<IcoController>(IcoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
