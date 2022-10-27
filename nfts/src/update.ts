import { nfts, provider } from './constants';
import { Get721Contract, TokenURIToJSON } from './helpers';

const getCollectionURIs = async (name: string, address: string, tokenIds: number[]) => {
  const chunkSize = 250;
  const chunks = Math.ceil(tokenIds.length / chunkSize);
  const tokenURIs: string[] = [];
  console.log("Getting token URIs for collection", name, address, "of", tokenIds.length, "nfts via", chunks, "chunks");
  // This is done in an individual way instead of making all calls at once because of maximum payload limitations
  // by the RPC
  await Promise.all(Array.from(Array(chunks)).map( async (_, i) => {
    const first = i * chunkSize;
    const last = first + chunkSize;
    try {
      const [chunkURIs] = await provider.all([ Get721Contract(address).batchTokenURI(tokenIds.slice(first, last))]);
      console.log("Got token URIs chunk", i, "for large collection", address);
      tokenURIs.push(...chunkURIs);
    } catch (e) {
      console.log("Failed to get token uris for chunk", i, `${first}-${last}`);
      throw e;
    }
    return true;
  }))
  return tokenURIs.map(t => TokenURIToJSON(t));
}

export const update = async () => {
  console.log("running update");
  const tokenIdCalls = Object.entries(nfts).map(([, address]) => Get721Contract(address).getAllTokenIds());
  const tokenIds = await provider.all(tokenIdCalls);
  console.log("Got all token ids");

  const allNfts: any = {};
  await Promise.all(Object.entries(nfts).map(async ([name, address], i) => {
    allNfts[name] = await getCollectionURIs(name, address, tokenIds[i]);
  }))
  console.log("Success");
  const resp = JSON.stringify(allNfts);
  await CF_KV_BLOCKCHAIN.put('GLOBAL_NFTS', resp);
  return new Response("success");
}