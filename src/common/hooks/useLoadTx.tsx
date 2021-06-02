import { useEffect } from 'react';
import { fetchBlockAsync } from '../../store/blockSlice';
import { useAppDispatch } from './useAppDispatch';
import useLoadProvider from './useProvider';

export default function useLoadTx() {
  const dispatch = useAppDispatch();
  const provider = useLoadProvider();

  useEffect(() => {
    if (provider)
      provider.on('block', (data) => {
        dispatch(fetchBlockAsync(data));
      });
  }, [provider]);
}
