import { TransactionResponse } from '@ethersproject/providers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(
  (window as { [key: string]: any }).ethereum
);

//TODO:
type TransactionResponseTemp = Omit<TransactionResponse, 'gasPrice'>;

export interface SerializeTransactionResponse extends TransactionResponseTemp {
  gasPrice: number;
}

export interface TransactionState {
  transactions: SerializeTransactionResponse[];
}

const initialState: TransactionState = {
  transactions: [],
};

/**
 * Fetching transaction data async
 */
export const fetchTransactionAsync = createAsyncThunk(
  'transaction/fetchTransaction',
  async (id: number) => {
    const txs: Array<SerializeTransactionResponse> = [];
    try {
      const txList = await provider.getBlockWithTransactions(id);
      txList.transactions.forEach((transaction) => {
        txs.push({
          ...transaction,
          gasPrice: transaction.gasPrice.toNumber(),
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionAsync.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export default transactionSlice.reducer;
