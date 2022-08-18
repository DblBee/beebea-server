import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { BeeBeaService } from 'src/beebea/beebea.service';
import { BeeBea } from 'src/beebea/entities/beebea.entity';
import { AnimationTrait } from 'src/beebea/genetics/entities/animation-trait.entity';
import { ColorTrait } from 'src/beebea/genetics/entities/color-trait.entity';
import { ShapeTrait } from 'src/beebea/genetics/entities/shape-trait.entity';
import { GeneticsService } from 'src/beebea/genetics/genetics.service';
import { TestingUtilityService } from 'src/testing-utility/testing-utility.service';
import { BeeBeaRouterController } from './beebea-router.controller';

describe('BeebeaRouterController', () => {
  let controller: BeeBeaRouterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [
        BeeBeaService,
        GeneticsService,
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
      controllers: [BeeBeaRouterController],
    }).compile();

    controller = module.get<BeeBeaRouterController>(BeeBeaRouterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
