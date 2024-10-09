import { http, createConfig } from 'wagmi';
import { aurora, auroraTestnet } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = '3fbb6bba6f1de962d911bb5b5c9dba88';
const showQrModal = true;

let qrModalOptions = {
  defaultChain: aurora,
};

export const config = createConfig({
  chains: [auroraTestnet, aurora],
  connectors: [
    injected(),
    walletConnect({ projectId, showQrModal, qrModalOptions }),
    metaMask(),
    safe(),
  ],
  transports: {
    [aurora.id]: http(),
    [auroraTestnet.id]: http(),
  },
});
