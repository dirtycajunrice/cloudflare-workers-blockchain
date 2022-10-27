import { providers } from 'ethers';
import { setMulticallAddress } from 'ethers-multicall';
import { Provider } from 'ethers-multicall/dist/provider';

import ERC721Artifact from './artifacts/EvoL2.json';

export const ABIs = {
  ERC721: ERC721Artifact.abi,
}

export const RPC_URL = 'https://avax.boba.network';

setMulticallAddress(43288, "0x352E11Da7C12EA2440b079A335E67ff9219f6FfB");
export const provider = new Provider(new providers.StaticJsonRpcProvider({
  url: RPC_URL,
  skipFetchSetup: true
}), 43288);

export const nfts: { [collection: string]: string } = {
  Evo: '0x3e9694a37846C864C67253af6F5d1F534ff3BF46',
  EvoEgg: '0xa3b63C50F0518aAaCf5cF4720B773e1371D10eBF',
};
