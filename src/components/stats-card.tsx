import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
// import { Counter } from "./animation"

interface StatsCardProps {
  icon: ReactNode
  value: number
  label: string
  prefix?: string
  suffix?: string
  formatter?: (value: number) => string
}

export function StatsCard({ icon, value, label, prefix = "", suffix = "", formatter }: StatsCardProps) {
  const defaultFormatter = (val: number) => {
    return `${prefix}${val.toLocaleString()}${suffix}`
  }

  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4 text-blue-600">{icon}</div>
      <div className="text-3xl font-bold mb-2">
        {/* <Counter from={0} to={value} formatter={formatter || defaultFormatter} /> */}
      </div>
      <div className="text-gray-500">{label}</div>
    </Card>
  )
}
