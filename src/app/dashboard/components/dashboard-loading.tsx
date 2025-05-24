"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const DashboardSkeleton = () => (
  <div className="space-y-8 mx-auto">
    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-48 rounded-md" />
    </div>

    {/* Main Cards Grid */}
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      {/* Student Info Skeleton */}
      <Card className="overflow-hidden border-blue-100 shadow-sm">
        <CardHeader className="bg-blue-50 pb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hostel Info Skeleton */}
      <Card className="overflow-hidden border-blue-100 shadow-sm">
        <CardHeader className="bg-blue-50 pb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 mt-0.5" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 mt-0.5" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            </div>
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>

    <Separator className="my-8" />

    {/* Quick Actions Skeleton */}
    <div>
      <h2 className="text-xl font-bold mb-4">
        <Skeleton className="h-6 w-32" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-48 mb-4" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    <Separator className="my-8" />

    {/* Bottom Section Skeleton */}
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <div>
        <h2 className="text-xl font-bold mb-4">
          <Skeleton className="h-6 w-32" />
        </h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">
          <Skeleton className="h-6 w-32" />
        </h2>
        <Card className="overflow-hidden border-blue-100 shadow-sm">
          <CardHeader className="bg-blue-50 pb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-14 w-14 rounded-md" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export { DashboardSkeleton };