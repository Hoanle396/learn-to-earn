import { IPFS_URL } from '@/configs';

export enum Storage {
  ACCESS_TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}

export const IPFS = (hash: string) => `${IPFS_URL}/${hash}`;
