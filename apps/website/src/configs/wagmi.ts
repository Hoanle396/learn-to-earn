import { bscTestnet } from "viem/chains";
import { createConfig, http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});
