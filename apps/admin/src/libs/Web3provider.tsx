import React from "react";
import { WagmiProvider } from "wagmi";
import { polygonAmoy } from "viem/chains";
import { createConfig, http } from "wagmi";

type Props = {
  children?: React.ReactNode;
};

export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
});


export const WagmiContext = ({ children }: Props) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
