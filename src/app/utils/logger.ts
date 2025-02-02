// app/utils/logger.ts
const enableLogging = process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true'

export const logger = {
  log: (...args: any[]) => {
    if (enableLogging) {
      console.log('[Vehicle Search]', ...args)
    }
  },
  error: (...args: any[]) => {
    if (enableLogging) {
      console.error('[Vehicle Search Error]', ...args)
    }
  },
  info: (...args: any[]) => {
    if (enableLogging) {
      console.info('[Vehicle Search Info]', ...args)
    }
  },
  debug: (...args: any[]) => {
    if (enableLogging) {
      console.debug('[Vehicle Search Debug]', ...args)
    }
  }
}
