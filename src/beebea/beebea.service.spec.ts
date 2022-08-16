import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { TestingUtilityService } from 'src/testing-utility/testing-utility.service';
import { BeebeaService } from './beebea.service';
import { BeeBea } from './entities/beebea.entity';
import { GeneticsService } from './genetics/genetics.service';

describe('BeebeaService', () => {
  let service: BeebeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot({ pinoHttp: { enabled: false } })],
      providers: [
        GeneticsService,
        BeebeaService,
        {
          provide: getRepositoryToken(BeeBea),
          useValue: TestingUtilityService.createMockRepository<BeeBea>(),
        },
      ],
    }).compile();

    service = module.get<BeebeaService>(BeebeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
