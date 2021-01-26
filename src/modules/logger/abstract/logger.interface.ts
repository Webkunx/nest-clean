export interface ILogger {
  error(message: any, trace?: string, context?: string): any;

  log(message: any, context?: string): any;

  warn(message: any, context?: string): any;
}
