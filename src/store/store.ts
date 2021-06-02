import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blockReducer from './blockSlice';
import transactionReducer from './trasactionSlice';

export const store = configureStore({
  reducer: {
    block: blockReducer,
    transaction: transactionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
