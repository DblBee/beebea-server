import * as fs from 'fs';
import path from 'path';
import { getPixels, savePixels } from 'ndarray-pixels';
import { GeneticElementType } from 'src/beebea/genetics/entities/genetic-trait.entity';
import { RGBNumericDto } from 'src/beebea/genetics/dtos/rgb.dto';
import { ColorTrait } from 'src/beebea/genetics/entities/color-trait.entity';

const emptyColorTrait = {
  assignmentNumber: 8,
  id: 8,
  createdAt: new Date(),
  updatedAt: new Date(),
  deleteAt: null,
  name: 'Empty',
  elementType: 'earth' as GeneticElementType,
  hex: '#000000',
  rgb: 'rgb(0,0,0,255)',
};

const testBeeBea = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  deleteAt: null,
  mintNumber: 1,
  name: 'BeeBea',
  creepyName: 'B͈̤̟́̈ȩ̲̎̓̈́ẹ̢͐̉B̧̫̓̓̃e̗̒̈́ͅà̩̘͗̊',
  htmlCreepyName:
    // eslint-disable-next-line max-len
    '&#x42;&#x341;&#x308;&#x348;&#x324;&#x31f;&#x65;&#x30e;&#x343;&#x344;&#x327;&#x332;&#x65;&#x350;&#x309;&#x322;&#x323;&#x42;&#x343;&#x313;&#x303;&#x327;&#x32b;&#x65;&#x312;&#x344;&#x345;&#x317;&#x61;&#x340;&#x357;&#x30a;&#x329;&#x318;',
  birthday: new Date(),
  generation: 0,
  dna: '0xd244ade1bfa8e34d2d625ecf5805256b91eb1d5b8e396fc11a1cfc5a1351eb74',
  bio: '',
  isReady: true,
  isGestating: false,
  cooldown: new Date(),
  cooldownIndex: 0,
  primaryColorTrait: {
    assignmentNumber: 1,
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'First Titan',
    elementType: 'water' as GeneticElementType,
    hex: '#3986fa',
    rgb: 'rgb(57,134,250,255)',
  },
  secondaryColorTrait: {
    assignmentNumber: 2,
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Unicorn Baroness',
    elementType: 'water' as GeneticElementType,
    hex: '#0499ba',
    rgb: 'rgb(4,153,186,255)',
  },
  accentColorTrait: {
    assignmentNumber: 3,
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Selfish Flamingo',
    elementType: 'fire' as GeneticElementType,
    hex: '#ff38ff',
    rgb: 'rgb(255,56,255,255)',
  },
  highlightColorTrait: {
    assignmentNumber: 4,
    id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Dizzy Rainbow',
    elementType: 'wind' as GeneticElementType,
    hex: '#eb15c0',
    rgb: 'rgb(235,21,192,255)',
  },
  complementaryColorTrait: {
    assignmentNumber: 5,
    id: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Loud Devil',
    elementType: 'fire' as GeneticElementType,
    hex: '#ba0000',
    rgb: 'rgb(186,0,0,255)',
  },
  polymericColorTrait: {
    assignmentNumber: 6,
    id: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Virtual Cayman',
    elementType: 'earth' as GeneticElementType,
    hex: '#28e038',
    rgb: 'rgb(40,224,56,255)',
  },
  environmentalColorTrait: {
    assignmentNumber: 7,
    id: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Boring Grandpa',
    elementType: 'fire' as GeneticElementType,
    hex: '#fff7db',
    rgb: 'rgb(255,247,219,255)',
  },
  recessiveColorTrait: {
    assignmentNumber: 8,
    id: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Hospital Walls',
    elementType: 'earth' as GeneticElementType,
    hex: '#ffffc4',
    rgb: 'rgb(255,255,196,255)',
  },
  primaryShapeTrait: {
    assignmentNumber: 1,
    id: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Abstract Water',
    elementType: 'water' as GeneticElementType,
    shape: 'ABSTRACT_WATER',
  },
  secondaryShapeTrait: {
    assignmentNumber: 2,
    id: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Four Squares',
    elementType: 'water' as GeneticElementType,
    shape: 'FOUR_SQUARES',
  },
  primaryAnimationTrait: {
    assignmentNumber: 1,
    id: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
    name: 'Abstract Water',
    elementType: 'water' as GeneticElementType,
    animation: 'ABSTRACT_WATER',
  },
};

const pixelArtColors = {
  primary: '80,80,80,255',
  secondary: '120,120,120,255',
  accent: '140,140,140,255',
  highlight: '180,180,180,255',
  complementary: '200,200,200,255',
  polymeric: '220,220,220,255',
  environmental: '240,240,240,255',
  recessive: '255,255,255,255',
  empty: '0,0,0,255',
};

const _getRGBNumericValueObject = (geneticTrait: ColorTrait): RGBNumericDto => {
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
};

const getPixelsFromImg = async () => {
  const bufferIn = fs.readFileSync(path.join(__dirname, '../src/images/base/MONSTER.png'));
  const pixels = await getPixels(bufferIn, 'image/png');

  const splitRegex = pixels.data.toString().match(/([0-9]+,[0-9]+,[0-9]+,[0-9]+)/g);

  const newPixelData: number[] = [];

  let rgbVal!: RGBNumericDto;

  splitRegex?.forEach((pixelArtColorVal) => {
    switch (pixelArtColorVal) {
      case pixelArtColors.primary:
        console.log('primary', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.primaryColorTrait);
        break;

      case pixelArtColors.secondary:
        console.log('secondary', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.secondaryColorTrait);
        break;

      case pixelArtColors.accent:
        console.log('accent', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.accentColorTrait);
        break;

      case pixelArtColors.highlight:
        console.log('highlight', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.highlightColorTrait);
        break;

      case pixelArtColors.complementary:
        console.log('complementary', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.complementaryColorTrait);
        break;

      case pixelArtColors.polymeric:
        console.log('polymeric', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.polymericColorTrait);
        break;

      case pixelArtColors.environmental:
        console.log('environmental', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.environmentalColorTrait);
        break;

      case pixelArtColors.recessive:
        console.log('recessive', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(testBeeBea.recessiveColorTrait);
        break;

      case pixelArtColors.empty:
        console.log('empty', pixelArtColorVal);
        rgbVal = _getRGBNumericValueObject(emptyColorTrait);
        break;
      default:
        console.log('not found', pixelArtColorVal);
        throw new Error('Pixel Art Color not found ' + pixelArtColorVal);
    }

    newPixelData.push(rgbVal.r);
    newPixelData.push(rgbVal.g);
    newPixelData.push(rgbVal.b);
    newPixelData.push(rgbVal.a);
  });

  console.log('splitRegex', splitRegex?.length);

  pixels.data = newPixelData;
  const bufferOut = await savePixels(pixels, 'image/png');
  const imageName = `${testBeeBea.mintNumber}-main.png`;
  const ImagePath = `src/images/${imageName}`;
  fs.writeFileSync(ImagePath, bufferOut);
};

getPixelsFromImg();
