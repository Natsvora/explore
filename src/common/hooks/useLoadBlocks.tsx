import { useEffect, useState } from 'react';
import {
  deleteBlocks,
  fetchBlockAsync,
  fetchPreviousBlocksAsync,
} from '../../component/Block/blockSlice';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import useLoadProvider from './useProvider';

/**
 * Load Previous Blocks and establish listener for new events
 * @returns void
 */
export default function useLoadBlocks(): void {
  const dispatch = useAppDispatch();
  const provider = useLoadProvider();
  const [appInitialized, setAppInitialized] = useState(false as boolean);
  const numberOfBlocks = useAppSelector((store) => store.block.blocks.length);

  // once app initialized after that on every provider change it will
  // register and deregister listener
  useEffect(() => {
    appInitialized &&
      provider?.on('block', (data) => {
        dispatch(fetchBlockAsync(data));
      });
    return () => {
      // removing listener on cleanup also cleaning up store
      appInitialized && dispatch(deleteBlocks());
      provider?.off('block');
    };
  }, [provider, appInitialized]);

  // on load it will load previous 15 blocks
  useEffect(() => {
    dispatch(fetchPreviousBlocksAsync(15));
  }, []);

  // on initial 15 blocks are loaded it will trigger state
  useEffect(() => {
    if (!appInitialized && numberOfBlocks > 15) {
      setAppInitialized(true);
    }
  }, [numberOfBlocks]);
}
