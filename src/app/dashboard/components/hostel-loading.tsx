"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const HostelsSkeleton = () => (
  <div className="space-y-6 w-full h-full">
    {/* Header Skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </div>

    {/* Tabs Skeleton */}
    <Tabs defaultValue="all">
      <TabsList className="gap-4">
        {["All", "Standard", "Premium", "Deluxe"].map((tab, i) => (
          <TabsTrigger key={i} value={tab.toLowerCase()}>
            <Skeleton className="h-8 w-24 rounded-md" />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>

    {/* Grid of Hostel Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden h-full flex flex-col">
          {/* Image section with badge */}
          <div className="relative h-48">
            <Skeleton className="h-full w-full absolute top-0 left-0" />
            <Skeleton className="absolute top-2 right-2 h-6 w-16 rounded-full" />
          </div>

          {/* Header */}
          <CardHeader className="pb-2 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-3 flex-grow">
            <div className="flex justify-between text-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between text-sm">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter>
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);
