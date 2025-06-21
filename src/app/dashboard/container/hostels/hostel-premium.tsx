import React from "react";
import { HostelType } from "../../../../../typings";
import { StaggerItem } from "@/components/animation";
import { RenderHostelCard } from "../../components/render-hostels-card";

interface PremiumProps {
  hostels: HostelType[];
}
const Premium = ({ hostels }: PremiumProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hostels
        ?.filter((h: HostelType) => h?.type === "Premium")
        ?.map((hostel: HostelType) => (
          <StaggerItem key={hostel?._id}>
            {RenderHostelCard({ hostel })}
          </StaggerItem>
        ))}
    </div>
  );
};

export { Premium };
