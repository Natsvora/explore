import { Block } from '@ethersproject/providers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

type BlockTemp = Omit<Block, 'gasLimit' | 'gasUsed'>;

//TODO:
export interface SerializeBlock extends BlockTemp {
  gasLimit: number;
  gasUsed: number;
  noOfTransactions: number;
}

const provider = new ethers.providers.Web3Provider(
  (window as { [key: string]: any }).ethereum
);

export interface BlockState {
  blocks: SerializeBlock[];
}

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlockAsync.fulfilled, (state, action) => {
      state.blocks.push(action.payload);
      if (state.blocks.length > 10)
        state.blocks = state.blocks.filter(
          (block) => block.number > action.payload.number - 10
        );
    });
  },
});

export default blockSlice.reducer;
