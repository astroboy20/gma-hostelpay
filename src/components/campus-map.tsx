"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Navigation, Info } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  type: "hostel" | "facility" | "landmark"
  position: { x: number; y: number }
  description: string
}

interface CampusMapProps {
  locations: MapLocation[]
}

export function CampusMap({ locations }: CampusMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  const getIconByType = (type: string) => {
    switch (type) {
      case "hostel":
        return <Building className="h-4 w-4" />
      case "facility":
        return <Info className="h-4 w-4" />
      case "landmark":
        return <Navigation className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getColorByType = (type: string) => {
    switch (type) {
      case "hostel":
        return "bg-blue-500"
      case "facility":
        return "bg-green-500"
      case "landmark":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-200">
      <div className="relative h-[500px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1569447891824-7a1398971906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="GMA Campus Map"
          fill
          className="object-cover"
        />

        {/* Map pins */}
        {locations.map((location) => (
          <motion.button
            key={location.id}
            className={`absolute z-10 p-1 rounded-full ${getColorByType(
              location.type,
            )} text-white shadow-md hover:scale-110 transition-transform`}
            style={{
              left: `${location.position.x}%`,
              top: `${location.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => {
              setSelectedLocation(location)
              setIsInfoVisible(true)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {getIconByType(location.type)}
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md">
        <div className="text-sm font-medium mb-2">Map Legend</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-xs">Hostels</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-xs">Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-xs">Landmarks</span>
          </div>
        </div>
      </div>

      {/* Info panel */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInfoVisible ? 1 : 0, y: isInfoVisible ? 0 : 20 }}
          className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                {getIconByType(selectedLocation.type)}
                {selectedLocation.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{selectedLocation.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsInfoVisible(false)}>
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
