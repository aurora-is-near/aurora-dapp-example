import {
  useAccount,
  useDisconnect,
  useBalance,
  type UseBalanceReturnType,
} from 'wagmi';

export function Account() {
  const { address, connector, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const result: UseBalanceReturnType = useBalance({ address: address });
  const formattedAddress = formatAddress(address);

  return (
    <div className="row">
      <div className="inline">
        <div className="stack">
          {address && <div className="text">{formattedAddress}</div>}
          <div className="subtext">
            Connector: {connector?.name}
            <br></br>
            {chain && <span> Chain: {chain.name} </span>}
            <br></br>
            {result.data && <span> Balance: {result.data.formatted} ETH</span>}
          </div>
        </div>
      </div>
      <div className="stack">
        <button className="button" onClick={() => disconnect()} type="button">
          Disconnect
        </button>
      </div>
    </div>
  );
}

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 8)}…${address.slice(34, 42)}`;
}
