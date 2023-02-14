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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // handle errors related to http-requests.
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | Error) => {
        console.log('HttpErrorInterceptor');
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          console.error('Server side error');
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
