import { Loader2 } from "lucide-react";

// components/LoadingSpinner.tsx
export function LoadingSpinner() {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }