import { client } from '@/app/client';
import { getContract } from 'thirdweb';
import { polygonAmoy } from 'thirdweb/chains';

export const predictionMarketContractAddress =
  '0xD03E0AbA3f568942184C4Ec22696453d1a29Db89';

export const tokenContractAddress =
  '0x16771a901A5D5a85b3B1CC49F723723cdC0B90E5';

export const predictionMarketContract = getContract({
  client: client,
  chain: polygonAmoy,
  address: predictionMarketContractAddress,
});

export const tokenContract = getContract({
  client: client,
  chain: polygonAmoy,
  address: tokenContractAddress,
});
