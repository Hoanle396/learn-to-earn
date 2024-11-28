import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Token } from '.';
import { TransactionActionType } from '@/shared/enums';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
