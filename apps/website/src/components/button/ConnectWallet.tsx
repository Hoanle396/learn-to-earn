import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <button
      className="rounded-full text-lg flex appearance-none h-12 w-fit px-7 hover:bg-slate-200 border cursor-pointer items-center justify-center font-medium"
      onClick={() => {
        if (isConnected) {
          disconnect();
        } else {
          connect({ connector: metaMask() });
        }
      }}
    >
      <span>
        {isConnected
          ? address?.substring(0, 5) +
            "..." +
            address?.substring(address.length - 5)
          : "Connect Wallet"}
      </span>
    </button>
  );
};

export default ConnectWallet;
