import { FormEvent } from 'react';
import { type Hex, parseEther } from 'viem';
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as Hex;
    const value = formData.get('value') as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="container">
      <div className="stack">
        <div>Send ETH Ξ</div>
        <br />
        <form className="set" onSubmit={submit}>
          <input name="address" placeholder="Address" required />
          <input
            name="value"
            placeholder="Amount (ETH)"
            type="number"
            step="0.0001"
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
