import { Column, Entity, Unique } from 'typeorm';
import { GeneticTrait } from './genetic-trait.entity';

@Entity({ name: 'color_trait' })
@Unique('COLOR_TRAIT_UNIQUE', ['elementType', 'assignmentNumber', 'traitType'])
export class ColorTrait extends GeneticTrait {
  @Column({ type: 'char', length: 7, unique: true })
  hex!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  rgb!: string;
}
