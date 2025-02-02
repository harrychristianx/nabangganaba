// app/page.tsx
'use client'

// React and core dependencies
import React, { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { usePathname } from 'next/navigation'

// Database
import { createClient } from '@supabase/supabase-js'

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SearchBar } from '@/components/SearchBar'
import { CheckCircle2, Coffee, Heart, MessageCircle, MessagesSquare } from 'lucide-react'

// Vehicle-related components
import { VehicleTable } from '@/components/VehicleTable'
import { VehicleCardList } from '@/components/VehicleCardList'

// Advertisement components
import { AdsBanner } from '@/components/AdsBanner'
import { AdGrid } from '@/components/AdGrid'

// Error handling
import { ErrorFallback } from '@/components/ErrorFallback'

// Utilities and hooks
import { logger } from '@/utils/logger'
import { useWindowSize } from '@/hooks/useWindowSize'
import { 
  pageview,
  trackSearchQuery, 
  trackSearchResults, 
  trackReportInitiated, 
  trackReportSubmitted,
  trackNavigation 
} from '@/utils/analytics'

// Types
import type { VehicleRecord } from '@/types/vehicle'

// Core Components
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const MainHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <Link 
            href="/our-source" 
            className="hover:opacity-80 transition-opacity"
            onClick={() => trackNavigation('our-source')}
          >
            <h1 className="text-xl sm:text-2xl font-bold">
              Nabangga na ba?
            </h1>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-3">
            <Link 
              href="/our-source"
              onClick={() => trackNavigation('our-source')}
            >
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-10 h-10 md:w-auto md:h-10 md:flex md:items-center md:gap-2 md:px-4 p-0 font-medium">
                <MessagesSquare className="h-5 w-5" strokeWidth={2} />
                <span className="hidden md:inline">Our Source</span>
              </Button>
            </Link>
            <Link 
              href="/donate"
              onClick={() => trackNavigation('donate')}
            >
              <Button className="bg-[#007DFE] hover:bg-[#022DB8] text-white w-10 h-10 md:w-auto md:h-10 md:flex md:items-center md:gap-2 md:px-4 p-0 font-medium">
                <Heart className="h-5 w-5" strokeWidth={3} />
                <span className="hidden md:inline">Donate GCash</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VehicleSearch() {
  const pathname = usePathname()
  const { width } = useWindowSize()
  const isMobile = width < 768

  const [plateNumber, setPlateNumber] = useState('')
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [reportingPlate, setReportingPlate] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState('')

  // Track page views
  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  // Search effect with analytics
  useEffect(() => {
    const searchVehicles = async () => {
      if (plateNumber.length < 2) {
        setVehicles([])
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Track search query when user types enough characters
        if (plateNumber.length >= 2) {
          trackSearchQuery(plateNumber)
        }

        const { data, error } = await supabase
          .from('nabangganaba')
          .select('*')
          .ilike('platenumber', `%${plateNumber}%`)
          .limit(10)

        if (error) throw error

        // Track search results
        trackSearchResults(plateNumber, data?.length || 0)

        if (data && data.length === 0) {
          setError('No vehicles found matching this plate number.')
        }

        setVehicles(data || [])
      } catch (error: any) {
        logger.error('Error details:', error)
        setError(error.message || 'Failed to fetch vehicle data')
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchVehicles, 300)
    return () => clearTimeout(debounceTimer)
  }, [plateNumber])

  const handleReportIssue = (plateNumber: string) => {
    trackReportInitiated(plateNumber)
    setReportingPlate(plateNumber)
    setSelectedReason('')
    setReportSubmitted('')
  }

  useEffect(() => {
    const loadRecentVehicles = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('nabangganaba')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) throw error

        setVehicles(data || [])
      } catch (error: any) {
        logger.error('Error loading recent vehicles:', error)
        setError('Failed to load recent vehicles')
      } finally {
        setIsLoading(false)
      }
    }

    loadRecentVehicles()
  }, [])

  const handleSubmitReport = async (plateNumber: string) => {
    if (!selectedReason) return

    try {
      // Track report submission
      trackReportSubmitted(plateNumber, selectedReason)

      const vehicle = vehicles.find(v => v.platenumber === plateNumber)
      if (!vehicle) return

      const existingReasons = vehicle.reported_reason
        ? JSON.parse(vehicle.reported_reason)
        : []

      const newReasons = [...existingReasons, selectedReason]

      const { error } = await supabase
        .from('nabangganaba')
        .update({
          reported: true,
          reported_reason: JSON.stringify(newReasons)
        })
        .eq('platenumber', plateNumber)

      if (error) throw error

      setVehicles(vehicles.map(v =>
        v.platenumber === plateNumber
          ? { ...v, reported: true, reported_reason: JSON.stringify(newReasons) }
          : v
      ))

      setReportSubmitted(`Report submitted for vehicle ${plateNumber}`)
      setSelectedReason('')
      setReportingPlate('')
    } catch (error) {
      logger.error('Error reporting vehicle:', error)
      setError('Failed to report vehicle')
    }
  }

  const handleClear = () => {
    setPlateNumber('')
    setVehicles([])
    setError(null)
    setReportingPlate('')
    setSelectedReason('')
    setReportSubmitted('')
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <AdsBanner />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <AdGrid />
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  {plateNumber ? 'Search Results' : 'Recent Reports'}
                </h2>
                <SearchBar
                  plateNumber={plateNumber}
                  onPlateNumberChange={setPlateNumber}
                  onClear={handleClear}
                />
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                vehicles.length > 0 && (
                  isMobile ? (
                    <VehicleCardList
                      vehicles={vehicles}
                      reportingPlate={reportingPlate}
                      selectedReason={selectedReason}
                      onReportIssue={handleReportIssue}
                      onReasonChange={setSelectedReason}
                      onSubmitReport={handleSubmitReport}
                      onCancelReport={() => setReportingPlate('')}
                    />
                  ) : (
                    <VehicleTable
                      vehicles={vehicles}
                      reportingPlate={reportingPlate}
                      selectedReason={selectedReason}
                      onReportIssue={handleReportIssue}
                      onReasonChange={setSelectedReason}
                      onSubmitReport={handleSubmitReport}
                      onCancelReport={() => setReportingPlate('')}
                    />
                  )
                )
              )}

              {reportSubmitted && (
                <Alert className="mt-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>{reportSubmitted}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="text-xs sm:text-sm text-muted-foreground">
              Data last updated: October 25, 2024
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  </ErrorBoundary>
  )
}