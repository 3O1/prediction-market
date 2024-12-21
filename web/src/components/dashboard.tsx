'use client';

import { useReadContract } from 'thirdweb/react';
import { Navbar } from './navbar';
import { predictionMarketContract } from '@/constants/contracts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import MarketCardSkeleton from './skeleton-card';
import MarketCard from './market-card';

export default function Dashboard() {
  const { data: marketCount, isLoading: isLoadingMarketCount } =
    useReadContract({
      contract: predictionMarketContract,
      method: 'function marketCount() view returns (uint256)',
      params: [],
    });

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <MarketCardSkeleton key={index} />
  ));
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4">
        <Navbar />
        <div className="mb-4">
          <img
            src="https://placehold.co/800x300"
            alt="Placeholder Banner"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending Resolution</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          {isLoadingMarketCount ? (
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {skeletonCards}
              </div>
            </TabsContent>
          ) : (
            <>
              <TabsContent value="active">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <MarketCard key={index} index={index} filter="active" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <MarketCard key={index} index={index} filter="pending" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resolved">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <MarketCard key={index} index={index} filter="resolved" />
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
