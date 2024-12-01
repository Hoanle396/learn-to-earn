import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Transaction } from '.';

@Entity()
@Index(['contractAddress'], { unique: true })
export class Token extends BaseEntity {
  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  icon: string;

  @Column({ type: 'int', nullable: true })
  decimals: number;

  @Column({ length: 50, nullable: true })
  symbol: string;

  @Column({ length: 100, nullable: false })
  contractAddress: string;

  @Column({ type: 'text', nullable: false })
  abi: string;

  @Column({ type: 'bigint', nullable: false })
  beginningBlock: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.token
  )
  transactions: Transaction[];
}
