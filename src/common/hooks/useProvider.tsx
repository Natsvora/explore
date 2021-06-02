import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

export default function useLoadProvider(): Web3Provider | undefined {
  const [provider, setProvider] = useState(null as any);

  // let provider: Web3Provider | undefined;

  React.useEffect(() => {
    //TODO: add proper type for ether
    setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
  }, []);

  return provider;
}
