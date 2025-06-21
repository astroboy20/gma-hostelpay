"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";


import {
  Pulse,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animation";
import { useGetHostelsQuery } from "@/providers/apis/hostel-api";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store/store";
import { HostelsSkeleton } from "../../components/hostel-loading";
import { Premium } from "./hostel-premium";
import { HostelType } from "../../../../../typings";
import { RenderHostelCard } from "../../components/render-hostels-card";
import { Standard } from "./hostel-standard";

const Hostels = () => {

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { data: hostels, isLoading } = useGetHostelsQuery(
    {
      token: accessToken,
    },
    { skip: !accessToken }
  );

  
  if (isLoading) {
    return <HostelsSkeleton />;
  }
  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Available Hostels
          </h1>
          <p className="text-muted-foreground">
            Browse and select your preferred hostel accommodation
          </p>
        </div>
      </FadeIn>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Hostels</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels?.map((hostel: HostelType) => (
                <StaggerItem key={hostel?._id}>
                  {RenderHostelCard({ hostel })}
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="standard" className="space-y-6">
          <StaggerContainer>
            <Standard hostels={hostels} />
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <StaggerContainer>
            <Premium hostels={hostels} />
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="deluxe" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels
                ?.filter((h: HostelType) => h?.type === "Deluxe")
                ?.map((hostel: HostelType) => (
                  <StaggerItem key={hostel?._id}>
                    {RenderHostelCard({ hostel })}
                  </StaggerItem>
                ))}
            </div>
          </StaggerContainer>
        </TabsContent>
      </Tabs>

   
    </div>
  );
};

export { Hostels };
