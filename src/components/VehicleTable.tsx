import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { VehicleTableProps } from '../types/vehicle'
import { VehicleActions } from './VehicleActions'
import { VehicleImage } from './VehicleImage'
import { ReportForm } from './ReportForm'
import React from "react"
import { VehicleStatus } from "./VehicleStatus"

export function VehicleTable({
  vehicles,
  onReportIssue,
  reportingPlate,
  selectedReason,
  onReasonChange,
  onSubmitReport,
  onCancelReport
}: VehicleTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow><TableHead className="w-[100px]">Status</TableHead><TableHead>Plate Number</TableHead><TableHead>Make</TableHead><TableHead>Model</TableHead><TableHead>Issue</TableHead><TableHead>Photo</TableHead><TableHead>Date Posted</TableHead><TableHead>Actions</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => {
            const attachments = JSON.parse(vehicle.attachments_details || '[]')[0]
            const rowKey = `${vehicle.platenumber}-${vehicle.created_at}`
  // Add this console.log
  console.log('Vehicle:', {
    plateNumber: vehicle.platenumber,
    verified: vehicle.verified,
    verified_from: vehicle.verified_from
  })
            return (
              <React.Fragment key={rowKey}>{/* Fragment to group the two rows */}
                <TableRow><TableCell><VehicleStatus
                  verified={vehicle.verified}
                  reported={vehicle.reported}
                  verified_from={vehicle.verified_from}
                /></TableCell><TableCell className="font-medium">{vehicle.platenumber}</TableCell><TableCell>{vehicle.make}</TableCell><TableCell>{vehicle.car}</TableCell><TableCell className="text-sm text-red-500">{vehicle.issue}</TableCell><TableCell><VehicleImage url={vehicle.url} href={attachments?.href} plateNumber={vehicle.platenumber} className="w-24 h-24" /></TableCell><TableCell>{new Date(vehicle.created_at).toLocaleString('en-PH')}</TableCell><TableCell><VehicleActions url={vehicle.url} plateNumber={vehicle.platenumber} onReportIssue={onReportIssue} /></TableCell></TableRow>
                {reportingPlate === vehicle.platenumber && (
                  <TableRow><TableCell colSpan={7} className="bg-slate-50"><ReportForm plateNumber={vehicle.platenumber} selectedReason={selectedReason} onReasonChange={onReasonChange} onSubmitReport={onSubmitReport} onCancelReport={onCancelReport} /></TableCell></TableRow>
                )}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}