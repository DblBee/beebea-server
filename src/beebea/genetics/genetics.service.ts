import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Keccak } from 'sha3';
import { Creepify, CreepifyOptions } from './creepy-generator';
import { CreepyNameDto } from './dtos/creepy-name.dto';
import { DnaDto } from './dtos/dna.dto';

@Injectable()
export class GeneticsService {
  constructor(
    @InjectPinoLogger(GeneticsService.name)
    private readonly _logger: PinoLogger,
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

    const bit240BitArray: number[] = [];

    // store each bit value in a number array. these numbers
    // will associate to the genetic trait in the db
    if (dnaArray) {
      dnaArray.forEach((dnaSeg) => {
        const bit240Val = parseInt(dnaSeg.substring(0, 4), 2);

        // add the new bit number to the array
        bit240BitArray.push(bit240Val);
      });
    }

    const dnaDto: DnaDto = {
      hex: hashHex,
      valueArray: bit240BitArray,
    };

    this._logger.info(`processDna(${hashHex}) ${dnaDto}`);

    // return the hash and the value array DnaDto
    return {
      hex: hashHex,
      valueArray: bit240BitArray,
    };
  }

  generateCreepyName(name: string, options?: CreepifyOptions): CreepyNameDto {
    const encodedName = Creepify.encode(name, options);
    const htmlName = Creepify.getHTML(encodedName);
    return {
      encodedName,
      htmlName,
    };
  }
}
