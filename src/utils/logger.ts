// utils/logger.ts

// Define log levels
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Interface for logger configuration
interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableReport: boolean;
}

// Default configuration
const defaultConfig: LoggerConfig = {
  minLevel: 'debug',
  enableConsole: process.env.NODE_ENV !== 'production',
  enableReport: process.env.NODE_ENV === 'production'
};

// Log level hierarchy
const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    return logLevels[level] >= logLevels[this.config.minLevel];
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  private async reportToService(level: LogLevel, message: string, error?: any) {
    if (this.config.enableReport) {
      try {
        // Example implementation - replace with your actual error reporting service
        await fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level,
            message,
            error: error ? {
              message: error.message,
              stack: error.stack,
              ...error
            } : undefined,
            timestamp: new Date().toISOString(),
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
          })
        });
      } catch (e) {
        // Fallback to console in case reporting fails
        if (this.config.enableConsole) {
          console.error('Failed to report error:', e);
        }
      }
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog('debug')) {
      const formattedMessage = this.formatMessage('debug', message, ...args);
      if (this.config.enableConsole) {
        console.debug(formattedMessage, ...args);
      }
    }
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog('info')) {
      const formattedMessage = this.formatMessage('info', message, ...args);
      if (this.config.enableConsole) {
        console.info(formattedMessage, ...args);
      }
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog('warn')) {
      const formattedMessage = this.formatMessage('warn', message, ...args);
      if (this.config.enableConsole) {
        console.warn(formattedMessage, ...args);
      }
      this.reportToService('warn', message, args[0]);
    }
  }

  error(message: string, ...args: any[]) {
    if (this.shouldLog('error')) {
      const formattedMessage = this.formatMessage('error', message, ...args);
      if (this.config.enableConsole) {
        console.error(formattedMessage, ...args);
      }
      this.reportToService('error', message, args[0]);
    }
  }

  // Utility method to create a new logger instance with custom config
  static create(config: Partial<LoggerConfig> = {}): Logger {
    return new Logger(config);
  }
}

// Export a default logger instance
export const logger = new Logger();

// Export the class for custom instances
export default Logger;