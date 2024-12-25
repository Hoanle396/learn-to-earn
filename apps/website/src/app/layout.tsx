'use client';
import Header from '@/components/layouts/Header';
import { WagmiContext } from '@/contexts/WagmiContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Footer from '../components/layouts/Footer';
import './globals.scss';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang='en'>
      <WagmiContext>
        <QueryClientProvider client={queryClient}>
          <body className='h-screen overflow-y-auto'>
            <Header />
            {children}
            <Footer />
          </body>
        </QueryClientProvider>
      </WagmiContext>
      <Toaster />
    </html>
  );
}
