import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Entity,
} from 'typeorm';
import { BeeBeaChild } from './beebea-child.entity';

@Entity({ name: 'beebea' })
export class BeeBea {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  name!: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  creepyName!: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
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

  @Column({ type: 'varchar', nullable: true, length: 512 })
  imageURL?: string;

  @Column({ type: 'varchar', nullable: true, length: 512 })
  imageURLCDN?: string;

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
