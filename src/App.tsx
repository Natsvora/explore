import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import useLoadProvider from './common/hooks/useProvider';
import useLoadTx from './common/hooks/useLoadTx';
import { useAppDispatch } from './common/hooks/useAppDispatch';
import { fetchTransactionAsync } from './store/trasactionSlice';

function App(): JSX.Element {
  useLoadTx();

  const dispatch = useAppDispatch();

  const handelClick = () => {
    dispatch(fetchTransactionAsync(12556249));
  };

  return (
    <div className='App'>
      <button onClick={handelClick}>Get Tx</button>
    </div>
  );
}

export default App;
