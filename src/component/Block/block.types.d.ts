type BlockTemp = Omit<Block, 'gasLimit' | 'gasUsed' | 'transactions'>;

export interface SerializeBlock extends BlockTemp {
  id: number;
  gasLimit: number;
  gasUsed: number;
  noOfTransactions: number;
  transactions?: string[];
}

export interface BlockState {
  blocks: SerializeBlock[];
}
