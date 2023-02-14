import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  // for client-side errors
  private loggerService: LoggerService = inject(LoggerService);

  constructor() {}

  showError(message: string) {
    this.loggerService.log(`Error: ${message}`);
    alert(`Error: ${message}`);
  }

  handleError(err: any): void {
    this.loggerService.log('GlobalErrorHandlerService');
    this.loggerService.logError(err);
    if (err instanceof HttpErrorResponse) {
      this.loggerService.log('HttpErrorResponse');
      if (!window.navigator.onLine) {
        this.loggerService.log('No internet connection');
        this.showError('No internet connection');
      } else if (err?.status === 0) {
        this.showError(err?.statusText);
      } else {
        this.showError(err?.error?.message);
      }
    } else {
      this.loggerService.log('Not httpErrorResponse');
      this.showError(err?.message);
    }
  }
}
