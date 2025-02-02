import { VehicleRecord } from "@/types/vehicle"
import { VehicleCard } from "./VehicleCard"

// components/VehicleCardList.tsx
interface VehicleCardListProps {
    vehicles: VehicleRecord[]
    reportingPlate: string
    selectedReason: string
    onReportIssue: (plateNumber: string) => void
    onReasonChange: (value: string) => void
    onSubmitReport: (plateNumber: string) => void
    onCancelReport: () => void
  }
  
 export function VehicleCardList({
    vehicles,
    reportingPlate,
    selectedReason,
    onReportIssue,
    onReasonChange,
    onSubmitReport,
    onCancelReport
  }: VehicleCardListProps) {
    return (
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={`${vehicle.platenumber}-${vehicle.created_at}`}
            vehicle={vehicle}
            onReportIssue={onReportIssue}
            isReporting={reportingPlate === vehicle.platenumber}
            selectedReason={selectedReason}
            onReasonChange={onReasonChange}
            onSubmitReport={onSubmitReport}
            onCancelReport={onCancelReport}
          />
        ))}
      </div>
    )
  }