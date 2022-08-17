import { Column, Entity, Unique } from 'typeorm';
import { GeneticTrait } from './genetic-trait.entity';

@Entity({ name: 'color_trait' })
@Unique('COLOR_TRAIT_UNIQUE', ['elementType', 'assignmentNumber'])
export class ColorTrait extends GeneticTrait {
  @Column({ type: 'varchar', length: 10, unique: true })
  hex!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  rgb!: string;
}
