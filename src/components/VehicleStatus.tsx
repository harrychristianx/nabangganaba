import { CheckCircle2, AlertTriangle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface VehicleStatusProps {
  verified: boolean
  reported: boolean
  issue?: string
  verified_from?: string
  reported_reason?: string
}

export function VehicleStatus({ 
  verified, 
  reported, 
  issue, 
  verified_from, 
  reported_reason 
}: VehicleStatusProps) {
  const reportedReasons = reported_reason ? JSON.parse(reported_reason) : []

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {verified && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 cursor-help">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-green-700">Verified</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{verified_from || 'Verification source not specified'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {reported && reportedReasons.length > 0 && (
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          <div className="flex flex-wrap gap-1">
            {reportedReasons.map((reason: string, index: number) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-[10px] py-0 h-auto bg-yellow-50"
              >
                {reason}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {issue && (
        <div className="flex items-center gap-1">
          <span className="text-xs text-red-500">{issue}</span>
        </div>
      )}
    </div>
  )
}