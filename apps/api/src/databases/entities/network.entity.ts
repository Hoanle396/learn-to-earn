import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Network extends BaseEntity {
  @PrimaryColumn()
  chainId: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  icon: string;

  @Column({ length: 10, nullable: false })
  symbol: string;

  @Column({ length: 255, nullable: false })
  scanAPI: string;

  @Column({ length: 255, nullable: false })
  rpcEndpoint: string;

  @Column({ length: 255, nullable: false })
  explorerEndpoint: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
