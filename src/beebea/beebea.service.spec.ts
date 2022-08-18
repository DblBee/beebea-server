import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { TestingUtilityService } from 'src/testing-utility/testing-utility.service';
import { BeeBeaService } from './beebea.service';
import { BeeBea } from './entities/beebea.entity';
import { AnimationTrait } from './genetics/entities/animation-trait.entity';
import { ColorTrait } from './genetics/entities/color-trait.entity';
import { ShapeTrait } from './genetics/entities/shape-trait.entity';
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
        {
          provide: getRepositoryToken(ColorTrait),
          useValue: TestingUtilityService.createMockRepository<ColorTrait>(),
        },
        {
          provide: getRepositoryToken(ShapeTrait),
          useValue: TestingUtilityService.createMockRepository<ShapeTrait>(),
        },
        {
          provide: getRepositoryToken(AnimationTrait),
          useValue: TestingUtilityService.createMockRepository<AnimationTrait>(),
        },
      ],
    }).compile();

    service = module.get<BeeBeaService>(BeeBeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
