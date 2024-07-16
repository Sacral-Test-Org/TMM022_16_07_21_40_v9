import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) { }

  logDebug(message: string, ...additional: any[]): void {
    this.logger.debug(message, ...additional);
  }

  logInfo(message: string, ...additional: any[]): void {
    this.logger.info(message, ...additional);
  }

  logWarn(message: string, ...additional: any[]): void {
    this.logger.warn(message, ...additional);
  }

  logError(message: string, ...additional: any[]): void {
    this.logger.error(message, ...additional);
  }

  logFatal(message: string, ...additional: any[]): void {
    this.logger.fatal(message, ...additional);
  }
}
