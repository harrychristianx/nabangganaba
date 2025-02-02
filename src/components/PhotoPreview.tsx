/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface PhotoPreviewProps {
  children: React.ReactNode
  imageUrl?: string 
}

export function PhotoPreview({ children, imageUrl }: PhotoPreviewProps) {
  if (!imageUrl) return children

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <img
          src={imageUrl}
          alt="Vehicle photo"
          className="w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}