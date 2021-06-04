export enum ENV {
  PRODUCTION = 'production',
}

export enum ACTION {
  BLOCK_FETCH_PREVIOUS = 'block/fetchPreviousBlocks',
  BLOCK_FETCH = 'block/fetchBlock',
  TRANSACTION_FETCH = 'transaction/fetchTransaction',
}

export enum COLUMN_TYPE {
  STRING = 'string',
  NUMBER = 'number',
  LINK = 'link',
}

export const BLOCK_FIELD = {
  NUMBER: {
    FIELD_NAME: 'number',
    DISPLAY_NAME: 'Block',
  },
  TIMESTAMP: {
    FIELD_NAME: 'timestamp',
    DISPLAY_NAME: 'Age',
  },
  NO_OF_TRANSACTION: {
    FIELD_NAME: 'noOfTransactions',
    DISPLAY_NAME: 'Number Of Txn',
  },
  MINER: {
    FIELD_NAME: 'miner',
    DISPLAY_NAME: 'Miner',
  },
  GAS_USED: {
    FIELD_NAME: 'gasUsed',
    DISPLAY_NAME: 'Gas Used',
  },
  GAS_LIMIT: {
    FIELD_NAME: 'gasLimit',
    DISPLAY_NAME: 'Gas Limit',
  },
};

export const TRANSACTION_FIELD = {
  HASH: {
    FIELD_NAME: 'hash',
    DISPLAY_NAME: 'Txn Hash',
  },
  TIMESTAMP: {
    FIELD_NAME: 'timestamp',
    DISPLAY_NAME: 'Age',
  },
  FROM: {
    FIELD_NAME: 'from',
    DISPLAY_NAME: 'From',
  },
  TO: {
    FIELD_NAME: 'to',
    DISPLAY_NAME: 'To',
  },
  VALUE: {
    FIELD_NAME: 'value',
    DISPLAY_NAME: 'Amount(In Ether)',
  },
  CONFIRMED: {
    FIELD_NAME: 'confirmations',
    DISPLAY_NAME: 'Blocks Confirmed',
  },
};
