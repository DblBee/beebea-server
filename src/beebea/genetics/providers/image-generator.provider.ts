import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { getPixels, savePixels } from 'ndarray-pixels';
import { BeeBea } from 'src/beebea/entities/beebea.entity';
import { RGBNumericDto } from '../dtos/rgb.dto';
import { ColorTrait } from '../entities/color-trait.entity';

// Used for the top and bottom rows
// TWO_TWO_TWO_TWO = 2 pixels per color will be generated for each color sent into the color array=
//      2 pixels for the colorDefinition[0]
//      2 pixels for the colorDefinition[1]
//      2 pixel for the colorDefinition[2]
//      2 pixels for the colorDefinition[3]

// Used for the middle rows of the image
// TWO_ONE_TWO_ONE_TWO =
//      2 pixels for the colorDefinition[1]
//      1 pixel for the colorDefinition[3]
//      2 pixels for the colorDefinition[0]
//      1 pixel for the colorDefinition[3]
//      2 pixels for the colorDefinition[2]
enum PixelDataRowType {
  TWO_TWO_TWO_TWO = 0,
  TWO_ONE_TWO_ONE_TWO = 1,
}

/*
The purpose of this class is to generate the 64 X 64 pixel image of a beebea
It takes the beebea genes and creates a map of the beebea in 64 X 64 pixel size

 2222 3333 4444 2222 <-- 8 entries 16 pixels
 2222 3333 4444 2222 <-- 8 entries 16 pixels
 5555 7777 7777 6666 <-- 8 entries 16 pixels
 5555 88 111 88 6666 <-- 10 entries but still 16 pixels, the middle #1 is 4 not three as displayed in this ascii
 6666 88 111 88 5555 <-- 10 entries but still 16 pixels, the middle #1 is 4 not three as displayed in this ascii
 6666 7777 7777 5555 <-- 8 entries 16 pixels
 2222 4444 3333 2222 <-- 8 entries 16 pixels
 2222 4444 3333 2222 <-- 8 entries 16 pixels

*/
@Injectable()
export class ImageGenerator {
  private _getRGBNumericValueObject(geneticTrait: ColorTrait): RGBNumericDto {
    const matchColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

    const match = matchColors.exec(geneticTrait.rgb);

    if (match && match.length > 2) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: parseInt(match[4]),
      };
    }

    throw new Error(`_getRGBNumericValueObject: RGB Invalid: ${geneticTrait}`);
  }

  private _getPixedRowDataFactory(rgbNumeric: RGBNumericDto, numberOfPixels: number): number[] {
    const pixelData: number[] = [];
    for (let i = 1; i <= numberOfPixels; i++) {
      pixelData.push(rgbNumeric.r);
      pixelData.push(rgbNumeric.g);
      pixelData.push(rgbNumeric.b);
      pixelData.push(rgbNumeric.a);
    }
    return pixelData;
  }

  private _getPixelDataRow(
    geneticTraitArray: Array<ColorTrait> = Array<ColorTrait>(4),
    rowType: PixelDataRowType,
  ): number[] {
    let rgbArray: number[] = [];
    if (rowType === PixelDataRowType.TWO_TWO_TWO_TWO) {
      rgbArray = rgbArray.concat(
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[0]), 2),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[1]), 2),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[2]), 2),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[3]), 2),
      );
    } else if (rowType === PixelDataRowType.TWO_ONE_TWO_ONE_TWO) {
      rgbArray = rgbArray.concat(
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[1]), 2),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[3]), 1),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[0]), 2),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[3]), 1),
        this._getPixedRowDataFactory(this._getRGBNumericValueObject(geneticTraitArray[2]), 2),
      );
    }
    return rgbArray;
  }

  private _getPixelData(beebea: BeeBea): Uint8Array {
    let rgbArray: number[] = [];
    // First Row
    rgbArray = rgbArray.concat(
      this._getPixelDataRow(
        [
          beebea.secondaryColorTrait,
          beebea.accentColorTrait,
          beebea.highlightColorTrait,
          beebea.secondaryColorTrait,
        ],
        PixelDataRowType.TWO_TWO_TWO_TWO,
      ),
      // Second Row
      this._getPixelDataRow(
        [
          beebea.secondaryColorTrait,
          beebea.accentColorTrait,
          beebea.highlightColorTrait,
          beebea.secondaryColorTrait,
        ],
        PixelDataRowType.TWO_TWO_TWO_TWO,
      ),
      // Third Row
      this._getPixelDataRow(
        [
          beebea.complementaryColorTrait,
          beebea.environmentalColorTrait,
          beebea.environmentalColorTrait,
          beebea.polymericColorTrait,
        ],
        PixelDataRowType.TWO_TWO_TWO_TWO,
      ),
      // Forth Row
      this._getPixelDataRow(
        [
          beebea.primaryColorTrait,
          beebea.complementaryColorTrait,
          beebea.polymericColorTrait,
          beebea.recessiveColorTrait,
        ],
        PixelDataRowType.TWO_ONE_TWO_ONE_TWO,
      ),
      // Fifth Row
      this._getPixelDataRow(
        [
          beebea.primaryColorTrait,
          beebea.polymericColorTrait,
          beebea.complementaryColorTrait,
          beebea.recessiveColorTrait,
        ],
        PixelDataRowType.TWO_ONE_TWO_ONE_TWO,
      ),
      // Sixth Row
      this._getPixelDataRow(
        [
          beebea.polymericColorTrait,
          beebea.environmentalColorTrait,
          beebea.environmentalColorTrait,
          beebea.complementaryColorTrait,
        ],
        PixelDataRowType.TWO_TWO_TWO_TWO,
      ),
      // Seventh Row
      this._getPixelDataRow(
        [
          beebea.secondaryColorTrait,
          beebea.highlightColorTrait,
          beebea.accentColorTrait,
          beebea.secondaryColorTrait,
        ],
        PixelDataRowType.TWO_TWO_TWO_TWO,
      ),
      // Eighth Row
      this._getPixelDataRow(
        [
          beebea.secondaryColorTrait,
          beebea.highlightColorTrait,
          beebea.accentColorTrait,
          beebea.secondaryColorTrait,
        ],
        PixelDataRowType.TWO_TWO_TWO_TWO,
      ),
    );
    return new Uint8Array(rgbArray);
  }

  async generate(beebea: BeeBea): Promise<string> {
    const bufferIn = fs.readFileSync('src/images/base/BASE.png');
    const pixels = await getPixels(bufferIn, 'image/png');
    const pixelData = this._getPixelData(beebea);
    pixels.data = pixelData;
    const bufferOut = await savePixels(pixels, 'image/png');
    const imageName = `${beebea.mintNumber}-main.png`;
    const ImagePath = `src/images/${imageName}`;
    fs.writeFileSync(ImagePath, bufferOut);
    return imageName;
  }
}
