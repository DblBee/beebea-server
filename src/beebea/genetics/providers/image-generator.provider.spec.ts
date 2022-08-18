import { Test, TestingModule } from '@nestjs/testing';
import path from 'path';
import * as fs from 'fs';
import { GeneticElementType } from '../entities/genetic-trait.entity';
import { ImageGenerator } from './image-generator.provider';

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

describe('ImageGenerator', () => {
  let provider: ImageGenerator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageGenerator],
    }).compile();

    provider = module.get<ImageGenerator>(ImageGenerator);
  });

  afterEach(() => {
    const testImagePath = path.join(__dirname, `../../../images/${testBeeBea.mintNumber}-main.png`);
    try {
      fs.unlinkSync(testImagePath);
    } catch (error) {}
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('generate', () => {
    it('generates the correct beebea image', async () => {
      await provider.generate(testBeeBea);
    });
  });
});
