"use client"
import React from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { metaMask } from "wagmi/connectors"

const ConnectWallet: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect();
  const { disconnect } = useDisconnect()

  return (
    <button
      className="rounded-full text-6xl"
      onClick={() => {
        if (isConnected) {
          disconnect()
        } else {
          connect({ connector: metaMask() })
        }
      }}
    >
      {isConnected ? address?.substring(0, 5) + '...' + address?.substring(address.length - 5) : 'Connect Wallet'}
    </button>
  )
}

export default ConnectWallet
