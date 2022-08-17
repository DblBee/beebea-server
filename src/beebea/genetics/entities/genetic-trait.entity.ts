import { AbstractEntity } from 'src/database/entities/abstract.entity';
import { Column, Unique } from 'typeorm';

export enum GeneticTraitType {
  COLOR = 'color',
  SHAPE = 'shape',
  ANIMATION = 'animation',
}

export enum GeneticElementType {
  WATER = 'water',
  FIRE = 'fire',
  EARTH = 'earth',
  WIND = 'wind',
}

/*

Genetic traits are broken down into three categories
COLOR / SHAPE / ANIMATION

The genetic trait will contain the value of one of these items
e.g traitType: 'color', traitValue: 'FFaaFF'
e.g traitType: 'shape', traitValue: 'ARROW_NW'
e.g traitType: 'animation', traitValue: 'RAIN'

The assignment number is directly related to the beebea dna genetic array.

Each generation gets 16 genetic traits per genetic trait
This is designated by the assignment number. 
The assignment number is multiplied by the generation except
for gen 0. gen 0 is assignment numbers0 - 15
Greater than 15 is gen 1, Greater than 31 is gen 2 

We will add information about the trait later that explains the story of the trait
*/
export abstract class GeneticTrait extends AbstractEntity {
  // the assignment number is directly related to the beebea dna genetic array.
  // the combination of genetic type and assignment number determines what the trait is and assigned
  @Column({ type: 'int', nullable: false })
  assignmentNumber!: number;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  name!: string;

  @Column({ enum: GeneticElementType, nullable: false })
  elementType!: GeneticElementType;

  @Column({ enum: GeneticTraitType, nullable: false })
  traitType!: GeneticTraitType;
}
