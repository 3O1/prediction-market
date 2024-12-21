import { predictionMarketContract } from '@/constants/contracts';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { MarketTime } from './market-time';
import MarketCardSkeleton from './skeleton-card';
import { MarketProgress } from './market-progress';
import { MarketBuyInterface } from './market-buy-interface';

interface MarketCardProps {
  index: number;
  filter: 'active' | 'pending' | 'resolved';
}

// interface for the market data
interface Market {
  question: string;
  optionA: string;
  optionB: string;
  endTime: bigint;
  outcome: number;
  totalOptionAShares: bigint;
  totalOptionBShares: bigint;
  resolved: boolean;
}

// interface for the shares balance
interface SharesBalance {
  optionAShares: bigint;
  optionBShares: bigint;
}

export default function MarketCard({ index, filter }: MarketCardProps) {
  const account = useActiveAccount();

  const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
    contract: predictionMarketContract,
    method:
      'function getMarketInfo(uint256 _marketId) view returns (string question, string optionA, string optionB, uint256 endTime, uint8 outcome, uint256 totalOptionAShares, uint256 totalOptionBShares, bool resolved)',
    params: [BigInt(index)],
  });

  const market: Market | undefined = marketData
    ? {
        question: marketData[0],
        optionA: marketData[1],
        optionB: marketData[2],
        endTime: marketData[3],
        outcome: marketData[4],
        totalOptionAShares: marketData[5],
        totalOptionBShares: marketData[6],
        resolved: marketData[7],
      }
    : undefined;

  // get the shares balance
  const { data: sharesBalanceData } = useReadContract({
    contract: predictionMarketContract,
    method:
      'function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares)',
    params: [BigInt(index), account?.address as string],
  });

  // parse the shares balance
  const sharesBalance: SharesBalance | undefined = sharesBalanceData
    ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1],
      }
    : undefined;

  // check if the market is expired
  const isExpired = new Date(Number(market?.endTime) * 1000) < new Date();
  // check if the market is resolved
  const isResolved = market?.resolved;

  // check if the market should be shown
  const showShow = () => {
    if (!market) return false;

    switch (filter) {
      case 'active':
        return !isExpired;
      case 'pending':
        return isExpired && !isResolved;
      case 'resolved':
        return isExpired && isResolved;
      default:
        return true;
    }
  };

  // if the market should not be shown return null
  if (!showShow()) {
    return null;
  }

  return (
    <Card key={index} className="flex flex-col">
      {isLoadingMarketData ? (
        // card skeleton component
        <MarketCardSkeleton />
      ) : (
        <>
          <CardHeader>
            {market?.endTime && <MarketTime endTime={market.endTime} />}
            <CardTitle>{market?.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {market && (
              // market progress component
              <MarketProgress
                optionA={market.optionA}
                optionB={market.optionB}
                totalOptionAShares={market.totalOptionAShares}
                totalOptionBShares={market.totalOptionBShares}
              />
            )}
            {new Date(Number(market?.endTime) * 1000) < new Date() ? (
              market?.resolved ? (
                // market resolved content
                <></>
              ) : (
                // market pending content
                <></>
              )
            ) : (
              // market buy interface
              <MarketBuyInterface market={market!} marketId={index} />
            )}
          </CardContent>
          <CardFooter>
            {market && sharesBalance && (
              // market share component
              <></>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
