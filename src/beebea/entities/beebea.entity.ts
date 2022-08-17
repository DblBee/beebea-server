import { AbstractEntity } from 'src/database/entities/abstract.entity';
import { Column, JoinColumn, ManyToOne, OneToMany, Entity } from 'typeorm';
import { AnimationTrait } from '../genetics/entities/animation-trait.entity';
import { ColorTrait } from '../genetics/entities/color-trait.entity';
import { ShapeTrait } from '../genetics/entities/shape-trait.entity';
import { BeeBeaChild } from './beebea-child.entity';

@Entity({ name: 'beebea' })
export class BeeBea extends AbstractEntity {
  @Column({ type: 'integer', default: () => 'getnextmintnumber()', unique: true })
  mintNumber!: number;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  name!: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  creepyName!: string;

  @Column({ type: 'text', nullable: false })
  htmlCreepyName!: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  birthday!: Date;

  @Column({ type: 'int', nullable: false })
  generation!: number;

  @Column({ type: 'char', length: 66, unique: true, nullable: false })
  dna!: string;

  @ManyToOne(() => ColorTrait)
  colorTrait1!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait2!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait3!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait4!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait5!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait6!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait7!: ColorTrait;

  @ManyToOne(() => ColorTrait)
  colorTrait8!: ColorTrait;

  @ManyToOne(() => ShapeTrait)
  shapeTrait1!: ShapeTrait;

  @ManyToOne(() => ShapeTrait)
  shapeTrait2!: ShapeTrait;

  @ManyToOne(() => AnimationTrait)
  animation1!: AnimationTrait;

  @ManyToOne(() => AnimationTrait)
  hiddenTrait!: AnimationTrait;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  isReady!: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  isGestating!: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  cooldown!: Date;

  @Column({ type: 'int', default: 0, nullable: false })
  cooldownIndex!: number;

  @ManyToOne(() => BeeBea)
  sire?: BeeBea;

  @ManyToOne(() => BeeBea)
  matron?: BeeBea;

  /* 
  This BeeBee might be a sire or a matron. 
  A new entity is created to designate which is which.
  The BeeBea Child handles the parent child relationship
  */
  @OneToMany(() => BeeBeaChild, (beeBeaChild) => beeBeaChild.parent)
  @JoinColumn()
  children?: BeeBeaChild[];
}
