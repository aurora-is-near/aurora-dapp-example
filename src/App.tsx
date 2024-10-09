import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { ConnectWallet } from './components/ConnectWallet';
import { SendTransaction } from './components/SendTransaction';
import { ERC20Transfer } from './components/WriteContract';
import { ERC20Balance } from './components/ReadContract';
import { config } from './wagmi';

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <SendTransaction />
        <ERC20Balance />
        <ERC20Transfer />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
