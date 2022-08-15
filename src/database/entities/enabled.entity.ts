import { Column } from 'typeorm';

import { BaseEntity } from './base.entity';

export class EnabledEntity extends BaseEntity {
  @Column({ type: 'boolean', default: true, nullable: true })
  enabled!: boolean;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  enabledAt!: Date;
}
