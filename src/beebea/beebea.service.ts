import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PostgresErrorCode } from 'src/database/constraints/errors.constraints';
import { EntityExistException } from 'src/web/exceptions/entity-exists.exception';
import { Repository } from 'typeorm';
import { BeeBea } from './entities/beebea.entity';
import { GeneticElementType } from './genetics/entities/genetic-trait.entity';
import { GeneticsService } from './genetics/genetics.service';

@Injectable()
export class BeeBeaService {
  constructor(
    @InjectPinoLogger(BeeBeaService.name)
    private readonly _logger: PinoLogger,
    private readonly _geneticService: GeneticsService,
    @InjectRepository(BeeBea)
    private readonly _beeBeaRepository: Repository<BeeBea>,
  ) {}

  async createGenZeroBeeBea(name: string, elementType: GeneticElementType): Promise<BeeBea> {
    try {
      const dna = this._geneticService.generateDna(randomUUID());

      const dnaDto = this._geneticService.processDna(dna.substring(2));

      const primaryColorTrait = await this._geneticService.getColorTrait(
        elementType,
        dnaDto.colorValueArray[0],
      );

      const secondaryColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[1],
      );

      const accentColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[2],
      );

      const highlightColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[3],
      );

      const complementaryColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[4],
      );

      const polymericColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[5],
      );

      const environmentalColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[6],
      );

      const recessiveColorTrait = await this._geneticService.getColorTrait(
        this._geneticService.getGeneticElementType(elementType),
        dnaDto.colorValueArray[7],
      );

      const primaryShapeTrait = await this._geneticService.getShapeTrait(
        primaryColorTrait.elementType,
        dnaDto.shapeValueArray[0],
      );

      const secondaryShapeTrait = await this._geneticService.getShapeTrait(
        secondaryColorTrait.elementType,
        dnaDto.shapeValueArray[1],
      );

      const primaryAnimationTrait = await this._geneticService.getAnimationTrait(
        primaryColorTrait.elementType,
        dnaDto.animationValueArray[0],
      );

      const creepyNameDto = this._geneticService.generateCreepyName(name);

      const beeBeaObj: Partial<BeeBea> = {
        name,
        creepyName: creepyNameDto.encodedName,
        htmlCreepyName: creepyNameDto.htmlName,
        generation: 0,
        dna,
        primaryColorTrait,
        secondaryColorTrait,
        accentColorTrait,
        highlightColorTrait,
        complementaryColorTrait,
        polymericColorTrait,
        environmentalColorTrait,
        recessiveColorTrait,
        primaryShapeTrait,
        secondaryShapeTrait,
        primaryAnimationTrait,
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

  async findOne(id: number): Promise<BeeBea | null> {
    this._logger.info(`Find One called with id: ${id}`);

    const beeBea = await this._beeBeaRepository.findOne({
      where: { id },
      relations: {
        primaryColorTrait: true,
        secondaryColorTrait: true,
        accentColorTrait: true,
        highlightColorTrait: true,
        complementaryColorTrait: true,
        polymericColorTrait: true,
        environmentalColorTrait: true,
        recessiveColorTrait: true,
        primaryShapeTrait: true,
        secondaryShapeTrait: true,
        primaryAnimationTrait: true,
      },
    });

    return beeBea;
  }
}
