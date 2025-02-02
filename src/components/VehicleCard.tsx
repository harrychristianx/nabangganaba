import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, AlertTriangle, CheckCircle2, Flag } from 'lucide-react'
import type { VehicleCardProps } from '../types/vehicle'
import { REPORT_REASONS } from '../constants/reportReasons'
import { VehicleActions } from "./VehicleActions"
import { ReportForm } from "./ReportForm"
import { VehicleImage } from "./VehicleImage"

export function VehicleCard({ 
  vehicle, 
  onReportIssue, 
  isReporting, 
  selectedReason, 
  onReasonChange,
  onSubmitReport,
  onCancelReport 
}: VehicleCardProps) {
  const attachments = JSON.parse(vehicle.attachments_details || '[]')[0]
  
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {vehicle.verified && (
              <CheckCircle2 className="w-5 h-5 text-green-500" title="Verified" />
            )}
            {vehicle.reported && (
              <AlertTriangle className="w-5 h-5 text-yellow-500" title="Reported" />
            )}
            <span className="font-bold text-lg">{vehicle.platenumber}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium"></span> {vehicle.make}
            </div>
            <div>
              <span className="font-medium"></span> {vehicle.car}
            </div>
            {vehicle.issue && (
              <div className="text-red-500">
                <span className="font-medium">Issue:</span> {vehicle.issue}
              </div>
            )}
          </div>
        </div>
        <VehicleActions 
          url={vehicle.url}
          plateNumber={vehicle.platenumber}
          onReportIssue={onReportIssue}
        />
      </div>

      <VehicleImage 
        url={vehicle.url}
        href={attachments?.href}
        plateNumber={vehicle.platenumber}
      />

      <div className="text-sm text-gray-500">
        Posted: {new Date(vehicle.created_at).toLocaleString('en-PH')}
      </div>

      {isReporting && (
        <ReportForm
          plateNumber={vehicle.platenumber}
          selectedReason={selectedReason}
          onReasonChange={onReasonChange}
          onSubmitReport={onSubmitReport}
          onCancelReport={onCancelReport}
        />
      )}
    </div>
  )
}