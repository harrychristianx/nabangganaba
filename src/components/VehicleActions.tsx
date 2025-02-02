import { ExternalLink, Flag } from "lucide-react"
import { Button } from "./ui/button"

// components/VehicleActions.tsx
interface VehicleActionsProps {
    url: string
    plateNumber: string
    onReportIssue: (plateNumber: string) => void
  }
  
  export function VehicleActions({ url, plateNumber, onReportIssue }: VehicleActionsProps) {
    return (
      <div className="flex items-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline flex items-center"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          View
        </a>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onReportIssue(plateNumber)}
          className="flex items-center gap-1"
        >
          <Flag className="w-4 h-4" />
          Report
        </Button>
      </div>
    )
  }