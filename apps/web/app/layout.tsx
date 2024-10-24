"use client"
import { WagmiContext } from "@/contexts/WagmiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";


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
          <body >
            {children}
          </body>
        </QueryClientProvider>
      </WagmiContext>
    </html >
  );
}
