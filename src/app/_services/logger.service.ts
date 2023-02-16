import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: string): void {
    console.log(`[LoggerService:log] ${message}`);
  }

  logWarning(message: string): void {
    console.warn(`[LoggerService:warn] ${message}`);
  }

  logError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      this.serverError(error);
    } else if (error instanceof Error) {
      this.clientError(error);
    }
  }

  protected clientError(error: Error) {
    const message = window.navigator.onLine
      ? `[LoggerService:clientError] ${error?.name} - ${error?.message}`
      : 'Please check your internet connection.';
    console.error(message);
  }

  protected serverError(error: HttpErrorResponse) {
    const clientError = !window.navigator.onLine || error.status === 0;
    const message = clientError
      ? 'Please check your internet connection.'
      : `[LoggerService:serverError] status: ${error?.status} - statusText: ${error?.statusText}`;
    console.error(message);
  }
}
