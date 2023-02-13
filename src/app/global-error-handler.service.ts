import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NgxNotifierService } from 'ngx-notifier';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  // for client-side errors

  private notifierService = inject(NgxNotifierService);

  constructor() {}

  showError(message: string) {
    console.log(`Error: ${message}`);
    this.notifierService.createToast(`Error: ${message}`, 'danger');
  }

  handleError(err: any): void {
    console.log('GlobalErrorHandlerService');
    console.log(err);
    if (err instanceof HttpErrorResponse) {
      console.log('HttpErrorResponse');
      if (!window.navigator.onLine) {
        console.error('No internet connection');
        this.showError('No internet connection');
      } else if (err?.status === 0) {
        this.showError(err?.statusText);
      } else {
        this.showError(err?.error?.message);
      }
    } else {
      console.log('Not httpErrorResponse');
      this.showError(err?.message);
    }
  }
}
