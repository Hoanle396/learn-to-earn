import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity()
@Index(['crawlKey'], { unique: false })
export class LatestBlock extends BaseEntity {
  @Column({ length: 255 })
  crawlKey: string;

  @Column({ type: 'bigint', nullable: false })
  blockNumber: number;
}
