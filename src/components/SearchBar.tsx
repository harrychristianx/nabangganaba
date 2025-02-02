import { Search, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"

interface SearchBarProps {
  plateNumber: string
  onPlateNumberChange: (value: string) => void
  onClear: () => void
}

export function SearchBar({ plateNumber, onPlateNumberChange, onClear }: SearchBarProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Reset animation after it completes
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1000) // Duration matches the CSS animation

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex space-x-2 mb-4">
      <div className="relative flex-grow">
        <Search 
          className={`absolute left-2 top-2.5 h-4 w-4 text-muted-foreground
            ${isAnimating ? 'animate-[searchPulse_1s_ease-in-out]' : ''}`}
          style={{
            // Add keyframes animation
            animation: isAnimating ? 
              'searchPulse 1s ease-in-out' : 
              'none',
            // Define the keyframes inline for better compatibility
            animationKeyframes: [
              {
                '0%': {
                  transform: 'scale(1)',
                },
                '50%': {
                  transform: 'scale(1.5)',
                },
                '100%': {
                  transform: 'scale(1)',
                }
              }
            ]
          }}
        />
        <Input
          type="text"
          placeholder="Enter Plate Number"
          value={plateNumber}
          onChange={(e) => onPlateNumberChange(e.target.value.toUpperCase())}
          className={`pl-8 transition-all duration-300
            ${isAnimating ? 'ring-2 ring-primary ring-offset-2' : ''}`}
        />
      </div>
      <Button 
        onClick={onClear} 
        variant="outline" 
        className="shrink-0"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}