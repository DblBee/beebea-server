import { Column, Entity, Unique } from 'typeorm';
import { GeneticTrait } from './genetic-trait.entity';

@Entity({ name: 'shape_trait' })
@Unique('SHAPE_TRAIT_UNIQUE', ['elementType', 'assignmentNumber'])
export class ShapeTrait extends GeneticTrait {
  @Column({ type: 'varchar', length: 128, unique: true })
  shape!: string;
}
