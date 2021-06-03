import { useEffect } from 'react';
import {
  deleteBlocks,
  fetchBlockAsync,
} from '../../component/Block/blockSlice';
import { useAppDispatch } from './useAppDispatch';
import useLoadProvider from './useProvider';

export default function useLoadBlocks(): void {
  const dispatch = useAppDispatch();
  const provider = useLoadProvider();

  useEffect(() => {
    provider?.on('block', (data) => {
      dispatch(fetchBlockAsync(data));
    });
    return () => {
      // removing listener on cleanup
      dispatch(deleteBlocks());
      provider?.off('block');
    };
  }, [provider]);
}
