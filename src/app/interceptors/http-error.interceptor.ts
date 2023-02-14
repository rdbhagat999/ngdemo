import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private loggerService: LoggerService = inject(LoggerService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // handle errors related to http-requests.
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | Error) => {
        this.loggerService.log('HttpErrorInterceptor');
        this.loggerService.logError(err);
        if (err instanceof HttpErrorResponse) {
          this.loggerService.log('Serverside error');
          if (err.status === 401 || err.status === 403) {
            // auto logout if 401 or 403 response returned from api
            this.authService.logoutFromDummyJson();
          }
          // return throwError(() =>  err.error.message || err.statusText);
        }
        return throwError(() => err);
      })
    );
  }
}
