import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { ENV } from '../common/constant';
import blockReducer from '../component/Block/blockSlice';
import transactionReducer from '../component/Transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    block: blockReducer,
    transaction: transactionReducer,
  },
  devTools: process.env.NODE_ENV !== ENV.PRODUCTION,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
