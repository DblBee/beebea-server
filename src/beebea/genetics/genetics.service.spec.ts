import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { GeneticsService } from './genetics.service';

describe('GeneticsService', () => {
  let service: GeneticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      it('returns chromosome dto with the hex and bit array populated', () => {
        const dnaStr = service.generateDna(randomUUID());
        expect(dnaStr).toBeDefined();

        const chromosomeDto = service.processDna(dnaStr.substring(2));
        expect(chromosomeDto).toBeDefined();
        expect(chromosomeDto.hex).toEqual(dnaStr.substring(2));
        expect(chromosomeDto.valueArray).toBeDefined();
        expect(chromosomeDto.valueArray.length).toEqual(48);
      });
    });
  });
});
