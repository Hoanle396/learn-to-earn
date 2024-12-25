import { useUpdateWallet } from '@/apis/auth/queries';
import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { auth } = useAuthStore();
  const { mutate } = useUpdateWallet();

  React.useEffect(() => {
    if (isConnected && auth?.user && address && address !== auth?.user?.wallet) {
      mutate({ wallet: address });
    }
  }, [isConnected, address]);

  if (!auth?.user) {
    return (
      <Link href='/login' className='btn theme-light enroll-btn'>
        <button className='rounded-full text-lg flex appearance-none h-12 w-fit px-7 hover:bg-slate-200 border cursor-pointer items-center justify-center font-medium'>
          <span>Login</span>
        </button>
      </Link>
    );
  }

  return (
    <button
      className='rounded-full text-lg flex appearance-none h-12 w-fit px-7 hover:bg-slate-200 border cursor-pointer items-center justify-center font-medium'
      onClick={() => {
        if (isConnected) {
          disconnect();
        } else {
          connect({ connector: metaMask() });
        }
      }}
    >
      <span>
        {isConnected ? address?.substring(0, 5) + '...' + address?.substring(address.length - 5) : 'Connect Wallet'}
      </span>
    </button>
  );
};

export default ConnectWallet;
