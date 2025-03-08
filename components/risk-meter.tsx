import { cn } from "@/lib/utils"

type RiskMeterProps = {
  score: number
  className?: string
}

export function RiskMeter({ score, className }: RiskMeterProps) {
  const getColor = (score: number) => {
    if (score <= 3) return "bg-green-500"
    if (score <= 6) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">Risk Level</span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className={cn("h-2.5 rounded-full", getColor(score))} style={{ width: `${score * 10}%` }}></div>
      </div>
    </div>
  )
}

