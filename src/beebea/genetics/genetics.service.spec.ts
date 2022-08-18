import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import * as he from 'he';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GeneticsService } from './genetics.service';
import { DnaDto } from './dtos/dna.dto';
import { CreepyNameDto } from './dtos/creepy-name.dto';
import { ColorTrait } from './entities/color-trait.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingUtilityService } from 'src/testing-utility/testing-utility.service';
import { AnimationTrait } from './entities/animation-trait.entity';
import { ShapeTrait } from './entities/shape-trait.entity';
import { GeneticElementType } from './entities/genetic-trait.entity';

describe('GeneticsService', () => {
  let service: GeneticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot({ pinoHttp: { enabled: false } })],
      providers: [
        GeneticsService,
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

    service = module.get<GeneticsService>(GeneticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateDna', () => {
    describe('generate dna based on random uuid', () => {
      it('returns a unique dna string in hex X 1000', () => {
        const dnas: string[] = [];
        for (let i = 0; i < 1000; i++) {
          const dnaStr = service.generateDna(randomUUID());

          if (dnas.includes(dnaStr)) {
            console.log('Found duplicate dna:', dnaStr);
            expect(dnas.includes(dnaStr)).toBeFalsy();
          }

          dnas.push(dnaStr);

          expect(dnaStr).toBeDefined();
        }
      });
    });
    describe('process dna', () => {
      it('returns dna dto with the hex and bit array populated', async () => {
        const dnaStr = service.generateDna(randomUUID());
        expect(dnaStr).toBeDefined();

        const dnaDtoData = service.processDna(dnaStr.substring(2));

        const dnaDto = plainToInstance(DnaDto, dnaDtoData);
        const errors = await validate(dnaDto);
        expect(errors.length).toEqual(0);

        expect(dnaDto).toBeDefined();
        expect(dnaDto).toBeInstanceOf(DnaDto);
        expect(dnaDto.hex).toEqual(dnaStr.substring(2));
        expect(dnaDto.colorValueArray).toBeDefined();
        expect(dnaDto.colorValueArray.length).toEqual(32);
        expect(dnaDto.shapeValueArray).toBeDefined();
        expect(dnaDto.shapeValueArray.length).toEqual(8);
        expect(dnaDto.animationValueArray).toBeDefined();
        expect(dnaDto.animationValueArray.length).toEqual(4);
        expect(dnaDto.hiddenValueArray).toBeDefined();
        expect(dnaDto.hiddenValueArray.length).toEqual(4);
      });
    });
  });

  describe('getGeneticElementType', () => {
    describe('generate random genetic element', () => {
      it('returns a random genetic element', () => {
        const selectedElements = [];
        const primaryElementType = GeneticElementType.FIRE;

        for (let i = 0; i < 1000; i++) {
          const selectedElementType = service.getGeneticElementType(primaryElementType);

          selectedElements.push(selectedElementType);
          expect(selectedElementType).toBeDefined();
        }

        console.log(
          'selectedElements - primary',
          selectedElements.filter((elm: GeneticElementType) => {
            return elm == primaryElementType;
          }).length,
        );
      });
    });
  });

  describe('generateCreepyName', () => {
    it('returns creepy name dto with encoded and html values', async () => {
      const creepyNameDtoData = service.generateCreepyName('BeeBea BeeBeaBee BeaBee BeaBeeBea', {
        top: true,
        middle: true,
        bottom: true,
        maxHeight: 3,
        randomization: 30,
      });

      const creepyNameDto = plainToInstance(CreepyNameDto, creepyNameDtoData);
      const errors = await validate(creepyNameDto);
      expect(errors.length).toEqual(0);

      expect(creepyNameDto).toBeDefined();
      expect(creepyNameDto).toBeInstanceOf(CreepyNameDto);
      expect(creepyNameDto.encodedName).toBeDefined();
      expect(creepyNameDto.htmlName).toBeDefined();

      const deodedHtml = he.decode(creepyNameDto.htmlName);
      expect(creepyNameDto.encodedName).toEqual(deodedHtml);
    });
  });
});
