import { wagmiConfig } from "@/configs";
import React from "react";
import { WagmiProvider } from "wagmi";

type Props = {
  children?: React.ReactNode;
};

export const WagmiContext = ({ children }: Props) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
