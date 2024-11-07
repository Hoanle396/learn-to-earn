"use client"
import React from "react";
import { WagmiContext } from "@/contexts/WagmiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import Header from "@/components/layouts/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <WagmiContext>
        <QueryClientProvider client={queryClient}>
          <body className="h-screen overflow-y-auto" >
            <Header />
            {children}
          </body>
        </QueryClientProvider>
      </WagmiContext>
    </html >
  );
}
