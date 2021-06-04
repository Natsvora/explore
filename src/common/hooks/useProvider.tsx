import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { ICustomWindow } from '../types';

export default function useLoadProvider(): Web3Provider | undefined {
  const [provider, setProvider] = useState(null as any);

  if (typeof (window as ICustomWindow).ethereum === 'undefined') {
    console.error('no metamask found');
  }

  React.useEffect(() => {
    // adding provider to local store
    if ((window as ICustomWindow).ethereum)
      setProvider(
        new ethers.providers.Web3Provider((window as ICustomWindow).ethereum)
      );
  }, [(window as ICustomWindow).ethereum]);

  return provider;
}
