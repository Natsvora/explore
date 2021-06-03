import { Block } from '@ethersproject/providers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { BlockState, SerializeBlock } from './block.types';

//TODO:
const provider = new ethers.providers.Web3Provider(
  (window as { [key: string]: any }).ethereum
);

const initialState: BlockState = {
  blocks: [],
};

/**
 * Fetch block data async
 */
export const fetchBlockAsync = createAsyncThunk(
  'block/fetchBlock',
  async (id: string) => {
    const block: Block = await provider.getBlock(id);
    const data: SerializeBlock = {
      ...block,
      id: block.number,
      gasLimit: block.gasLimit.toNumber(),
      gasUsed: block.gasUsed.toNumber(),
      noOfTransactions: block.transactions.length,
    };
    return data;
  }
);

/**
 * Fetch previous 15 blocks data
 */
export const fetchPreviousBlocksAsync = createAsyncThunk(
  'block/fetchPreviousBlocks',
  async (noOfBlocks: number) => {
    try {
      const previousBlocks: SerializeBlock[] = [];
      // fetching current block number
      const currentBlock = await provider.getBlockNumber();
      for (let i = currentBlock - noOfBlocks - 1; i < currentBlock; i++) {
        const block = await provider.getBlock(i);
        previousBlocks.push({
          ...block,
          id: block.number,
          gasLimit: block.gasLimit.toNumber(),
          gasUsed: block.gasUsed.toNumber(),
          noOfTransactions: block.transactions.length,
        });
      }
      return previousBlocks;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
);

/**
 * Create block slice
 */
export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    deleteBlocks: (state) => {
      state.blocks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlockAsync.fulfilled, (state, action) => {
        state.blocks.push(action.payload);
        if (state.blocks.length > 10) {
          state.blocks = state.blocks.filter(
            (block) => block.number > action.payload.number - 15
          );
        }
        state.blocks.sort((data1, data2) => data2.number - data1.number);
      })
      .addCase(fetchPreviousBlocksAsync.fulfilled, (state, action) => {
        state.blocks = action.payload.sort(
          (data1, data2) => data2.number - data1.number
        );
      });
  },
});

export const { deleteBlocks } = blockSlice.actions;

export default blockSlice.reducer;
