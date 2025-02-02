// components/VehicleImage.tsx
interface VehicleImageProps {
    url: string
    href?: string
    plateNumber: string
    className?: string
  }
  
  export function VehicleImage({ url, href, plateNumber, className = "h-48 w-full" }: VehicleImageProps) {
    if (!href) return null
  
    return (
      <div className="flex justify-center">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={href}
            alt={`Vehicle ${plateNumber}`}
            className={`rounded-md object-cover ${className}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/api/placeholder/200/200'
            }}
          />
        </a>
      </div>
    )
  }