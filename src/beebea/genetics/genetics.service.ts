import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Keccak } from 'sha3';
import { Repository } from 'typeorm';
import { Creepify, CreepifyOptions } from './creepy-generator';
import { CreepyNameDto } from './dtos/creepy-name.dto';
import { DnaDto } from './dtos/dna.dto';
import { AnimationTrait } from './entities/animation-trait.entity';
import { ColorTrait } from './entities/color-trait.entity';
import { GeneticElementType } from './entities/genetic-trait.entity';
import { ShapeTrait } from './entities/shape-trait.entity';

@Injectable()
export class GeneticsService {
  constructor(
    @InjectPinoLogger(GeneticsService.name)
    private readonly _logger: PinoLogger,
    @InjectRepository(ColorTrait)
    private readonly _colorTraitRepository: Repository<ColorTrait>,
    @InjectRepository(ShapeTrait)
    private readonly _shapeTraitRepository: Repository<ShapeTrait>,
    @InjectRepository(AnimationTrait)
    private readonly _animationTraitRepository: Repository<AnimationTrait>,
  ) {}

  private _generateRandomDna(inputValue: string): string {
    const hash = new Keccak(256);

    hash.update(inputValue);

    const hashHex = hash.digest('hex');

    return hashHex;
  }

  private _convertBufferToBinaryString(buffer: Buffer) {
    const result = [];
    for (let i = 0; i < buffer.length; i++) {
      result.unshift(buffer[i].toString(2).padStart(8, '0'));
    }
    return result.join('');
  }

  generateDna(inputValue: string): string {
    const dna = this._generateRandomDna(inputValue);

    this._logger.info(`generateDna(${inputValue}) 0x${dna}`);

    return `0x${dna}`;
  }

  processDna(hashHex: string): DnaDto {
    // convert the hex to a buffer
    const hashBinaryBuffer = Buffer.from(hashHex, 'hex');

    // convert the buffer into a binary string
    // e.g 000110000001100000011000000110000001100000011000
    const binaryStr = this._convertBufferToBinaryString(hashBinaryBuffer);

    // cut out 16 bits from the string to make it a 240 bit array
    const bit240 = binaryStr.substring(0, binaryStr.length - 16);

    // segment the 240 bit string array by 5 characters
    const dnaArray = bit240.match(/.{1,5}/g);

    const colorTraitValueArray: number[] = [];
    const shapeTraitValueArray: number[] = [];
    const animationTraitValueArray: number[] = [];
    const hiddenTraitValueArray: number[] = [];

    // store each bit value in a number array. these numbers
    // will associate to the genetic trait in the db
    if (dnaArray) {
      dnaArray.forEach((dnaSeg: string, idx: number) => {
        const bit240Val = parseInt(dnaSeg.substring(0, 4), 2);

        const currentIdx = idx + 1;

        if (currentIdx <= 32) {
          colorTraitValueArray.push(bit240Val);
        }

        if (currentIdx > 32 && currentIdx <= 40) {
          shapeTraitValueArray.push(bit240Val);
        }

        if (currentIdx > 40 && currentIdx <= 44) {
          animationTraitValueArray.push(bit240Val);
        }

        if (currentIdx > 44) {
          hiddenTraitValueArray.push(bit240Val);
        }
      });
    }

    const dnaDto: DnaDto = {
      hex: hashHex,
      colorValueArray: colorTraitValueArray,
      shapeValueArray: shapeTraitValueArray,
      animationValueArray: animationTraitValueArray,
      hiddenValueArray: hiddenTraitValueArray,
    };

    this._logger.info(`processDna(${hashHex}) ${dnaDto}`);

    return dnaDto;
  }

  getGeneticElementType(primaryElementType: GeneticElementType): GeneticElementType {
    // we need to return an element type that can be used to select the ColorTrait
    // based on assignmentNumber and elementType

    const elementArray = [
      GeneticElementType.EARTH,
      GeneticElementType.FIRE,
      GeneticElementType.WATER,
      GeneticElementType.WIND,
    ];

    // create an array [1000] of the 4 element types.
    // weight the primary element type 34%
    // all other element types will weigh 22% each
    const nonPrimaryElementTypes = elementArray.filter((elType) => elType != primaryElementType);
    const primaryElementTypeArray = Array.from({ length: 340 }, () => primaryElementType);
    const other1ElementTypeArray = Array.from({ length: 220 }, () => nonPrimaryElementTypes[0]);
    const other2ElementTypeArray = Array.from({ length: 220 }, () => nonPrimaryElementTypes[1]);
    const other3ElementTypeArray = Array.from({ length: 220 }, () => nonPrimaryElementTypes[2]);

    let elementTypeArray: GeneticElementType[] = [
      ...primaryElementTypeArray,
      ...other1ElementTypeArray,
      ...other2ElementTypeArray,
      ...other3ElementTypeArray,
    ];

    // shuffle the array to make things spicy
    elementTypeArray = elementTypeArray.sort(() => Math.random() - 0.5);

    // get the random index for the element type
    const random = Math.floor(Math.random() * elementTypeArray.length);

    // return the randomly selected element type
    return elementTypeArray[random];
  }

  async getColorTrait(
    elementType: GeneticElementType,
    assignmentNumber: number,
  ): Promise<ColorTrait> {
    const colorTrait = await this._colorTraitRepository.findOne({
      where: {
        assignmentNumber,
        elementType,
      },
    });

    if (colorTrait) {
      return colorTrait;
    }

    throw new Error(
      'getColorTrait - Trait was not found. A trait must be found from the assignmentNumber',
    );
  }

  async getShapeTrait(
    elementType: GeneticElementType,
    assignmentNumber: number,
  ): Promise<ShapeTrait> {
    // there are only 8 shapes per element so divide the assignment number by 2
    const colorTrait = await this._shapeTraitRepository.findOne({
      where: {
        assignmentNumber: Math.floor(assignmentNumber / 2),
        elementType,
      },
    });

    if (colorTrait) {
      return colorTrait;
    }

    throw new Error(
      'getShapeTrait - Trait was not found. A trait must be found from the assignmentNumber',
    );
  }

  async getAnimationTrait(
    elementType: GeneticElementType,
    assignmentNumber: number,
  ): Promise<AnimationTrait> {
    // there are only 4 animations per element so divide the assignment number by 4
    const colorTrait = await this._animationTraitRepository.findOne({
      where: {
        assignmentNumber: Math.floor(assignmentNumber / 4),
        elementType,
      },
    });

    if (colorTrait) {
      return colorTrait;
    }

    throw new Error(
      'getAnimationTrait - Trait was not found. A trait must be found from the assignmentNumber',
    );
  }

  generateCreepyName(name: string, options?: CreepifyOptions): CreepyNameDto {
    const encodedName = Creepify.encode(name, options);
    const htmlName = Creepify.getHTML(encodedName);

    const creepyNameDto: CreepyNameDto = {
      htmlName,
      encodedName,
    };

    return creepyNameDto;
  }
}
