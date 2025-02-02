// hooks/useWindowSize.ts
import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}