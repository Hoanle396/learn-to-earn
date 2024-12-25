import { polygonAmoy } from 'viem/chains';
import { createConfig, http } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
});
