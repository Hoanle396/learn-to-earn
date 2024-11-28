import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContractConfig {
  @IsNotEmpty()
  @IsString()
  contractAddress: string;

  @IsNotEmpty()
  @IsString()
  rpcEndpoint: string;

  constructor() {
    this.contractAddress = process.env.CONTRACT_ADDRESS;
    this.rpcEndpoint = process.env.RPC_ENDPOINT;
  }
}

export default registerAs<ContractConfig>('contract', () => new ContractConfig());
