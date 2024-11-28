import { Token } from '@/databases/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenSeedService {
  logger = new Logger(TokenSeedService.name);

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  async bootstrap(): Promise<void> {
    await this.truncateTables();
    await this.seedToken();

    this.logger.log('The data seeding process for Token has been completed successfully!');
  }

  private async truncateTables(): Promise<void> {
    await this.tokenRepository.query(`TRUNCATE TABLE token RESTART IDENTITY CASCADE`);
  }

  private async seedToken(): Promise<void> {
    const tokens = [
      {
        id: 1,
        name: 'Ethereum',
        icon: null,
        decimals: 18,
        symbol: 'ETH',
        contractAddress: '0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea',
        abi: ``,
        beginningBlock: 21282817,
        isActive: true,
      },
    ];

    await this.tokenRepository.save(tokens);
  }
}
