import React from "react";
import { WagmiProvider } from "wagmi";
import { hardhat, polygonAmoy } from "viem/chains";
import { createConfig, http } from "wagmi";

type Props = {
  children?: React.ReactNode;
};

export const wagmiConfig = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http('https://rpc.dev-domain.site'),
  },
});


export const WagmiContext = ({ children }: Props) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
