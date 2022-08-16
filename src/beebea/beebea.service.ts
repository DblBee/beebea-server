import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { PostgresErrorCode } from 'src/database/constraints/errors.constraints';
import { EntityExistException } from 'src/web/exceptions/entity-exists.exception';
import { Repository } from 'typeorm';
import { BeeBea } from './entities/beebea.entity';
import { GeneticsService } from './genetics/genetics.service';

@Injectable()
export class BeebeaService {
  constructor(
    private readonly _geneticService: GeneticsService,
    @InjectRepository(BeeBea)
    private readonly _beeBeaRepository: Repository<BeeBea>,
  ) {}

  async createGenZeroBeeBea(name: string): Promise<BeeBea> {
    try {
      // generate the dna string
      const dna = this._geneticService.generateDna(randomUUID());

      // const imageURL = await this._imageGenerator.generate(chromosome);
      const creepyNameDto = this._geneticService.generateCreepyName(name);

      const beeBeaObj: Partial<BeeBea> = {
        name,
        creepyName: creepyNameDto.encodedName,
        htmlCreepyName: creepyNameDto.htmlName,
        generation: 0,
        dna,
        isReady: true,
        isGestating: false,
        cooldown: new Date(),
        cooldownIndex: 0,
      };

      const beeBea = this._beeBeaRepository.create(beeBeaObj);

      return this._beeBeaRepository.save(beeBea);
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new EntityExistException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
