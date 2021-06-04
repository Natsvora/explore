import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import {
  SerializeTransactionResponse,
  TransactionState,
} from './transaction.types';

let provider = ethers.providers.getDefaultProvider();

try {
  provider = new ethers.providers.Web3Provider(
    (window as { [key: string]: any }).ethereum
  );
} catch (e) {
  // error
}

const initialState: TransactionState = {
  transactions: [],
};

/**
 * Fetching transaction data async
 */
export const fetchTransactionAsync = createAsyncThunk(
  'transaction/fetchTransaction',
  async (id?: number) => {
    const txs: Array<SerializeTransactionResponse> = [];
    try {
      // if no id provided it will fetch transaction for latest block
      if (!id) id = await provider.getBlockNumber();
      const txList = await provider.getBlockWithTransactions(id);
      txList.transactions.forEach((transaction) => {
        txs.push({
          ...transaction,
          //transactionIndex is not present in its type class
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          id: (transaction as any).transactionIndex,
          timestamp: txList.timestamp,
          gasPrice: transaction.gasPrice.toNumber(),
          gasLimit: transaction.gasLimit.toNumber(),
          value: transaction.value.toHexString(),
        });
      });
    } catch (e) {
      //TODO:
      console.log(e);
    }
    return txs;
  }
);

/**
 * Create slice for transaction
 */
export const transactionSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    deleteTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionAsync.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const { deleteTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
