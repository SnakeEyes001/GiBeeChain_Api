import { Test, TestingModule } from '@nestjs/testing';
import { IcoService } from './ico.service';

describe('IcoService', () => {
  let service: IcoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcoService],
    }).compile();

    service = module.get<IcoService>(IcoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
