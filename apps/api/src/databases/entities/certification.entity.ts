import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base/base.entity';
@Entity()
@Index(['tokenId'], { unique: true })
export class Certification extends BaseEntity {
  @Column({ length: 100, nullable: false })
  wallet: string;

  @Column('bigint')
  tokenId: number;
}
