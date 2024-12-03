import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Prize extends BaseEntity {
  @Column({ type: 'int' })
  poolIdOnChain: number;

  @Column({ type: 'bigint', nullable: true })
  totalPrizes: number;

  @Column({ type: 'int', nullable: true })
  totalUser: number;

  @Column({ type: 'bigint', nullable: true })
  winningPrizes: number;

  @Column({ type: 'bigint', nullable: true })
  claimedPrizes: number;
}
