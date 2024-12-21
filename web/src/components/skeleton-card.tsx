import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const MarketCardSkeleton = () => {
  return (
    <Card className="flex flex-col">
      <div className="animated-pulse">
        <CardHeader>
          <Badge variant="secondary" className="mb-2 bg-gray-200 h-4 w-full" />
          <CardTitle className="bg-gray-200 h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="bg-gray-200 h-4 w-1/4" />
              <span className="bg-gray-200 h-4 w-1/4" />
            </div>
            <Progress value={0} className="h-2 bg-gray-200" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MarketCardSkeleton;
