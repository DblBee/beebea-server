import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import * as he from 'he';
import { GeneticsService } from './genetics.service';
import { DnaDto } from './dtos/dna.dto';
import { CreepyNameDto } from './dtos/creepy-name.dto';

describe('GeneticsService', () => {
  let service: GeneticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot({ pinoHttp: { enabled: false } })],
      providers: [GeneticsService],
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
  });

  describe('generateDna', () => {
    describe('process dna', () => {
      it('returns dna dto with the hex and bit array populated', () => {
        const dnaStr = service.generateDna(randomUUID());
        expect(dnaStr).toBeDefined();

        const dnaDto = service.processDna(dnaStr.substring(2));
        expect(dnaDto).toBeDefined();
        expect(dnaDto).toBeInstanceOf(DnaDto);
        expect(dnaDto.hex).toEqual(dnaStr.substring(2));
        expect(dnaDto.valueArray).toBeDefined();
        expect(dnaDto.valueArray.length).toEqual(48);
      });
    });
  });

  describe('generateCreepyName', () => {
    it('returns creepy name dto with encoded and html values', () => {
      const creepyNameDto = service.generateCreepyName('BeeBea BeeBeaBee BeaBee BeaBeeBea', {
        top: true,
        middle: true,
        bottom: true,
        maxHeight: 3,
        randomization: 30,
      });

      expect(creepyNameDto).toBeDefined();
      expect(creepyNameDto).toBeInstanceOf(CreepyNameDto);
      expect(creepyNameDto.encodedName).toBeDefined();
      expect(creepyNameDto.htmlName).toBeDefined();

      const deodedHtml = he.decode(creepyNameDto.htmlName);
      expect(creepyNameDto.encodedName).toEqual(deodedHtml);
    });
  });
});
