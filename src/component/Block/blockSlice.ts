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
    builder.addCase(fetchBlockAsync.fulfilled, (state, action) => {
      state.blocks.push(action.payload);
      if (state.blocks.length > 10) {
        state.blocks = state.blocks.filter(
          (block) => block.number > action.payload.number - 15
        );
      }
      state.blocks.sort((data1, data2) => data2.number - data1.number);
    });
  },
});

export const { deleteBlocks } = blockSlice.actions;

export default blockSlice.reducer;
