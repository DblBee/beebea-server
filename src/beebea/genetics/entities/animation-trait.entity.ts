import { Column, Entity, Unique } from 'typeorm';
import { GeneticTrait } from './genetic-trait.entity';

@Entity({ name: 'animation_trait' })
@Unique('ANIMATION_TRAIT_UNIQUE', ['elementType', 'assignmentNumber', 'traitType'])
export class AnimationTrait extends GeneticTrait {
  @Column({ type: 'varchar', length: 128, unique: true })
  animation!: string;
}
