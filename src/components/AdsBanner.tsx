'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Banner {
  id: number
  message: string
  cta_text: string
  cta_url: string
  start_color: string
  end_color: string
}

export function AdsBanner() {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchBanner() {
      try {
        const { data, error } = await supabase
          .from('nabangganaba-banner')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) throw error
        setBanner(data)
      } catch (error) {
        console.error('Error fetching banner:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanner()
  }, [])

  // Don't render anything if loading or no active banner
  if (isLoading || !banner) return null

  return (
    <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white mt-16`}>
      <div className="container mx-auto p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">
              Ad
            </span>
            <p className="text-sm sm:text-base">
              {banner.message}
            </p>
          </div>
          <a
            href={banner.cta_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white text-blue-600 rounded-full font-medium px-2 py-1.5 hover:bg-blue-50 transition-colors"
          >
            {banner.cta_text}
          </a>
        </div>
      </div>
    </div>
  )
}