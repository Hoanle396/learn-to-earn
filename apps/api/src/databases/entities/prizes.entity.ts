import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { RankingPool } from './ranking-pool.entity';

@Entity()
export class Prize extends BaseEntity {
  @ManyToOne(() => RankingPool, rankingPool => rankingPool.id)
  pool: Relation<RankingPool>;

  @ManyToOne(() => User, user => user.id)
  user: Relation<User>;

  @Column({ type: 'boolean', nullable: true, default: true })
  isJoined: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  isPassed: boolean;
}
