import { useReadContract, useAccount, type BaseError } from 'wagmi';
import { erc20Abi } from 'viem';

const erc20Address = '0xF257a66Ddf715049E32aEe591Dc5Ef107B9d9340';
const contractConfig = {
  abi: erc20Abi,
  address: erc20Address,
};

export function ERC20Balance() {
  const { address } = useAccount();
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [address],
  });

  if (isPending) return <div>Loading...</div>;

  if (error)
    return (
      <div>Error: {(error as BaseError).shortMessage || error.message}</div>
    );

  return (
    <div className="container">
      Your 🍉Watermelon🍉 Balance: {balance?.toString()}WTM
    </div>
  );
}
