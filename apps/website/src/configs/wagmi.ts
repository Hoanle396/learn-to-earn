import { hardhat, polygonAmoy } from 'viem/chains';
import { createConfig, http } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http('https://rpc.dev-domain.site'),
  },
});
