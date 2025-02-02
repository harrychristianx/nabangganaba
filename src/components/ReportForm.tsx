// components/ReportForm.tsx
import { AlertCircle } from 'lucide-react'
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { REPORT_REASONS } from '@/constants/reportReasons'

interface ReportFormProps {
  plateNumber: string
  selectedReason: string
  onReasonChange: (value: string) => void
  onSubmitReport: (plateNumber: string) => void
  onCancelReport: () => void
}

export function ReportForm({ 
  plateNumber, 
  selectedReason, 
  onReasonChange,
  onSubmitReport,
  onCancelReport 
}: ReportFormProps) {
  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="text-red-700 font-medium mb-3">
        Report Vehicle {plateNumber}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-4">
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between border-red-200 text-muted-foreground"
              >
                {selectedReason || "Select a reason for reporting"}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {REPORT_REASONS.map((reason) => (
                <DropdownMenuItem
                  key={reason}
                  onClick={() => onReasonChange(reason)}
                >
                  {reason}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onSubmitReport(plateNumber)}
            disabled={!selectedReason}
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Submit Report
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancelReport}
            size="sm"
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
          >
            Cancel
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}