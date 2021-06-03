import { TransactionResponse } from '@ethersproject/providers';

type TransactionResponseTemp = Omit<
  TransactionResponse,
  'gasPrice' | 'gasLimit' | 'value'
>;

export interface SerializeTransactionResponse extends TransactionResponseTemp {
  id: string;
  gasPrice: number;
  gasLimit: number;
  value: string;
}

export interface TransactionState {
  transactions: SerializeTransactionResponse[];
}

export interface TransactionProps {
  id?: string | undefined;
}
