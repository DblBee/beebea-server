import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { TestingUtilityService } from 'src/testing-utility/testing-utility.service';
import { BeeBeaService } from './beebea.service';
import { BeeBea } from './entities/beebea.entity';
import { GeneticsService } from './genetics/genetics.service';

describe('BeeBeaService', () => {
  let service: BeeBeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot({ pinoHttp: { enabled: false } })],
      providers: [
        GeneticsService,
        BeeBeaService,
        {
          provide: getRepositoryToken(BeeBea),
          useValue: TestingUtilityService.createMockRepository<BeeBea>(),
        },
      ],
    }).compile();

    service = module.get<BeeBeaService>(BeeBeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
