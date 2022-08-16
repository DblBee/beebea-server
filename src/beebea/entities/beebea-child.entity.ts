import { Column, ManyToOne, OneToOne, JoinColumn, Entity } from 'typeorm';
import { AbstractEntity } from 'src/database/entities/abstract.entity';
import { BeeBea } from './beebea.entity';

@Entity({ name: 'beebea_children' })
export class BeeBeaChild extends AbstractEntity {
  @Column({ type: 'boolean', default: false, nullable: false })
  isSire!: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  isMatron!: boolean;

  // beebea can be a parent to multiple children
  @ManyToOne(() => BeeBea)
  parent!: BeeBea;

  // this designates this beebea is a child of the parent
  @OneToOne(() => BeeBea)
  @JoinColumn()
  child!: BeeBea;
}
