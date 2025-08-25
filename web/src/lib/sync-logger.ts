/**
 * Sync Logger
 * Provides centralized logging and error handling for user sync operations
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
  operation?: string;
  userId?: string;
}

/**
 * Sync Logger Class
 */
export class SyncLogger {
  private static instance: SyncLogger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs

  private constructor() {}

  static getInstance(): SyncLogger {
    if (!SyncLogger.instance) {
      SyncLogger.instance = new SyncLogger();
    }
    return SyncLogger.instance;
  }

  /**
   * Log a message with specified level
   */
  private log(
    level: LogLevel,
    message: string,
    data?: any,
    error?: Error,
    operation?: string,
    userId?: string
  ) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      error,
      operation,
      userId,
    };

    // Add to internal logs
    this.logs.push(logEntry);

    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output based on level
    const logMessage = `[${level.toUpperCase()}] ${
      operation ? `[${operation}]` : ''
    } ${userId ? `[User: ${userId}]` : ''} ${message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(logMessage, data || '');
        break;
      case LogLevel.INFO:
        console.info(logMessage, data || '');
        break;
      case LogLevel.WARN:
        console.warn(logMessage, data || '');
        break;
      case LogLevel.ERROR:
        console.error(logMessage, error || data || '');
        break;
    }
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any, operation?: string, userId?: string) {
    this.log(LogLevel.DEBUG, message, data, undefined, operation, userId);
  }

  /**
   * Log info message
   */
  info(message: string, data?: any, operation?: string, userId?: string) {
    this.log(LogLevel.INFO, message, data, undefined, operation, userId);
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any, operation?: string, userId?: string) {
    this.log(LogLevel.WARN, message, data, undefined, operation, userId);
  }

  /**
   * Log error message
   */
  error(
    message: string,
    error?: Error,
    data?: any,
    operation?: string,
    userId?: string
  ) {
    this.log(LogLevel.ERROR, message, data, error, operation, userId);
  }

  /**
   * Get all logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter((log) => log.level === level);
  }

  /**
   * Get logs by user
   */
  getLogsByUser(userId: string): LogEntry[] {
    return this.logs.filter((log) => log.userId === userId);
  }

  /**
   * Get logs by operation
   */
  getLogsByOperation(operation: string): LogEntry[] {
    return this.logs.filter((log) => log.operation === operation);
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Get error summary
   */
  getErrorSummary(): { total: number; byOperation: Record<string, number> } {
    const errors = this.getLogsByLevel(LogLevel.ERROR);
    const byOperation: Record<string, number> = {};

    errors.forEach((error) => {
      const operation = error.operation || 'unknown';
      byOperation[operation] = (byOperation[operation] || 0) + 1;
    });

    return {
      total: errors.length,
      byOperation,
    };
  }
}

// Export singleton instance
export const syncLogger = SyncLogger.getInstance();

/**
 * Error handling utilities
 */
export class SyncErrorHandler {
  /**
   * Handle sync operation with error handling
   */
  static async handleSyncOperation<T>(
    operation: string,
    userId: string,
    operationFn: () => Promise<T>
  ): Promise<T> {
    try {
      syncLogger.info(`Starting ${operation}`, undefined, operation, userId);
      const result = await operationFn();
      syncLogger.info(
        `Completed ${operation} successfully`,
        result,
        operation,
        userId
      );
      return result;
    } catch (error) {
      syncLogger.error(
        `Failed to complete ${operation}`,
        error as Error,
        undefined,
        operation,
        userId
      );
      throw error;
    }
  }

  /**
   * Retry operation with exponential backoff
   */
  static async retryOperation<T>(
    operation: string,
    userId: string,
    operationFn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        syncLogger.info(
          `Attempt ${attempt}/${maxRetries} for ${operation}`,
          undefined,
          operation,
          userId
        );
        const result = await operationFn();
        syncLogger.info(
          `Completed ${operation} on attempt ${attempt}`,
          result,
          operation,
          userId
        );
        return result;
      } catch (error) {
        lastError = error as Error;
        syncLogger.warn(
          `Attempt ${attempt}/${maxRetries} failed for ${operation}`,
          undefined,
          operation,
          userId
        );

        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt - 1);
          syncLogger.info(
            `Retrying ${operation} in ${delay}ms`,
            undefined,
            operation,
            userId
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    syncLogger.error(
      `All ${maxRetries} attempts failed for ${operation}`,
      lastError!,
      undefined,
      operation,
      userId
    );
    throw lastError!;
  }

  /**
   * Handle webhook event with error handling
   */
  static async handleWebhookEvent(
    eventType: string,
    eventData: any,
    handlerFn: (data: any) => Promise<void>
  ): Promise<void> {
    const userId = eventData.id || 'unknown';

    try {
      syncLogger.info(
        `Processing webhook event: ${eventType}`,
        eventData,
        'webhook',
        userId
      );
      await handlerFn(eventData);
      syncLogger.info(
        `Successfully processed webhook event: ${eventType}`,
        undefined,
        'webhook',
        userId
      );
    } catch (error) {
      syncLogger.error(
        `Failed to process webhook event: ${eventType}`,
        error as Error,
        eventData,
        'webhook',
        userId
      );
      throw error;
    }
  }
}
