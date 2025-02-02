// components/ErrorFallback.tsx
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        An error occurred: {error.message}
      </AlertDescription>
      <Button onClick={resetErrorBoundary} variant="outline" size="sm" className="mt-2">
        Try again
      </Button>
    </Alert>
  )
}