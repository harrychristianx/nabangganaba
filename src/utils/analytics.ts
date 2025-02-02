// utils/analytics.ts
import { pageview as gtagPageview, event as gtagEvent } from './gtag'

export const pageview = (url: string) => {
  gtagPageview(url)
}

export const trackSearchQuery = (query: string) => {
  gtagEvent({
    action: 'search',
    category: 'vehicle_search',
    label: query,
  })
}

export const trackSearchResults = (query: string, resultCount: number) => {
  gtagEvent({
    action: 'search_results',
    category: 'vehicle_search',
    label: `${query} - ${resultCount} results`,
    value: resultCount
  })
}

export const trackReportInitiated = (plateNumber: string) => {
  gtagEvent({
    action: 'report_initiated',
    category: 'vehicle_report',
    label: plateNumber,
  })
}

export const trackReportSubmitted = (plateNumber: string, reason: string) => {
  gtagEvent({
    action: 'report_submitted',
    category: 'vehicle_report',
    label: `${plateNumber} - ${reason}`,
  })
}

export const trackNavigation = (destination: string) => {
  gtagEvent({
    action: 'navigation',
    category: 'user_journey',
    label: destination,
  })
}