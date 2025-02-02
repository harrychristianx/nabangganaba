// types/vehicle.ts
export interface VehicleRecord {
    platenumber: string
    make: string
    car: string
    content: string
    url: string
    attachments: string
    attachments_details: string
    created_at: string
    reported: boolean
    verified: boolean
    issue: string
    reported_reason: string
    verified_from: string;
  }
  
  export interface VehicleCardProps {
    vehicle: VehicleRecord
    onReportIssue: (plateNumber: string) => void
    isReporting: boolean
    selectedReason: string
    onReasonChange: (value: string) => void
    onSubmitReport: (plateNumber: string) => void
    onCancelReport: () => void
  }
  
  export interface VehicleTableProps {
    vehicles: VehicleRecord[]
    onReportIssue: (plateNumber: string) => void
    reportingPlate: string
    selectedReason: string
    onReasonChange: (value: string) => void
    onSubmitReport: (plateNumber: string) => void
    onCancelReport: () => void
  }