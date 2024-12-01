import { TransactionActionType } from '@/shared/enums';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Token } from '.';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Transaction extends BaseEntity {
  @Column({ nullable: true })
  fromAddress: string;

  @Column({ nullable: true })
  toAddress: string;

  @Column({ nullable: true })
  value: string;

  @Column({ nullable: true })
  blockTimestamp: string;

  @Column({
    type: 'enum',
    enum: TransactionActionType,
  })
  type: TransactionActionType;

  @Column({ nullable: true })
  transactionHash: string;

  @ManyToOne(
    () => Token,
    (token) => token.transactions,
    {
      onDelete: 'CASCADE',
    }
  )
  token: Token;
}
