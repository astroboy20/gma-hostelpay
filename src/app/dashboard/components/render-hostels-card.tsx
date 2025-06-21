import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HostelType } from "../../../../typings";
import { Pulse } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
interface HostelCardProps {
  hostel: HostelType;
}
export const RenderHostelCard = ({hostel}:HostelCardProps) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
    <div className="relative h-48">
      <Image
        src={
          hostel?.type === "Standard"
            ? "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            : hostel?.type === "Premium"
            ? "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            : "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
        alt={hostel?.name}
        fill
        className="object-cover"
      />
      <Badge className="absolute top-2 right-2 bg-blue-600">
        {hostel?.type}
      </Badge>
    </div>
    <CardHeader className="pb-2">
      <CardTitle>{hostel?.name}</CardTitle>
      <CardDescription>
        ₦{hostel?.price.toLocaleString()} per academic year
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2 flex-grow">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Capacity:</span>
        <span>{hostel.capacity}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Available:</span>
        <span>
          {hostel?.available} of {hostel?.total} rooms
        </span>
      </div>
      <div className="pt-2">
        <h4 className="text-sm font-medium mb-2">Features:</h4>
        <div className="flex flex-wrap gap-2">
          {hostel?.features.slice(0, 3).map((feature: string) => (
            <Badge
              key={feature}
              variant="outline"
              className="flex items-center gap-1"
            >
              {/* {getFeatureIcon(feature)} */}
              {feature}
            </Badge>
          ))}
          {hostel?.features?.length > 3 && (
            <Badge variant="outline">
              +{hostel?.features?.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Pulse>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
        //   onClick={() => handleOpenDialog(hostel)}
        >
          View Details
        </Button>
      </Pulse>
    </CardFooter>
  </Card>
);
