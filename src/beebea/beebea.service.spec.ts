import { Test, TestingModule } from '@nestjs/testing';
import { BeebeaService } from './beebea.service';

describe('BeebeaService', () => {
  let service: BeebeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeebeaService],
    }).compile();

    service = module.get<BeebeaService>(BeebeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
