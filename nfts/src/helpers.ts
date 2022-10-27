import { Contract } from 'ethers-multicall/dist/contract';
import { ABIs } from './constants';

export const TokenURIToJSON = (uri: string) => {
  if (!uri.startsWith('{')) {
    const b64 = uri.split(',')[1];
    return atob(b64);
  }
  return JSON.parse(uri);
};

export const Get721Contract = (address: string): Contract => new Contract(address, ABIs.ERC721);