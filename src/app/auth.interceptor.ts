import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);

    let currentUser = authService.AuthUserStatus;

    const user_string = localStorage.getItem('user');

    const user = user_string ? JSON.parse(user_string) : '';
    const token = user?.token;

    if (token && request?.url.includes('dummyjson')) {
      const cloneReq = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloneReq);
    }

    return next.handle(request);
  }
}
