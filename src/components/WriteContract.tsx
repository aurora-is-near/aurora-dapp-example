import { FormEvent } from 'react';
import { type Hex } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi } from 'viem';

const erc20Address = '0xF257a66Ddf715049E32aEe591Dc5Ef107B9d9340';
const contractConfig = {
  abi: erc20Abi,
  address: erc20Address,
};

export function ERC20Transfer() {
  const { data: hash, writeContract, error, isPending } = useWriteContract();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as Hex;
    const value = formData.get('value') as string;
    writeContract({
      ...contractConfig,
      functionName: 'transfer',
      args: [
        to, //recipient address
        value,
      ],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="container">
      <div className="stack">
        <div>Send Watermelons 🍉🍉🍉</div>
        <br />
        <form className="set" onSubmit={submit}>
          <input name="address" placeholder="Address" required />
          <input
            name="value"
            placeholder="Amount (Watermelons)"
            type="number"
            step="1"
            required
          />
          <button disabled={isPending} type="submit">
            {isPending ? 'Confirming...' : 'Send'}
          </button>
        </form>
        {hash && (
          <a
            href={`https://explorer.testnet.aurora.dev/tx/${hash}`}
            target="_blank"
          >
            Transaction Hash Link
          </a>
        )}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).name || error.message}</div>
        )}
      </div>
    </div>
  );
}
