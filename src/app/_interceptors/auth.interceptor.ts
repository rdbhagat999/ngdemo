import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@app/_services/auth.service';
import { ROLE } from '@app/_models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);

    const currentUser = authService.getSessionStorageUser();

    if (request?.url.includes('dummyjson')) {
      if (currentUser?.token) {
        const cloneReq = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });

        return next.handle(cloneReq);
      }

      if (request?.url.includes('/auth/login')) {
        return next.handle(request).pipe(
          map((response) => {
            if (response instanceof HttpResponse) {
              if (response?.ok) {
                if (response.body.username === 'kminchelle') {
                  response.body.role = ROLE.ADMIN;
                } else if (response.body.username === 'hbingley1') {
                  response.body.role = ROLE.AUTHOR;
                } else {
                  response.body.role = ROLE.USER;
                }
              }
            }
            return response;
          })
        );
      }
    }

    return next.handle(request);
  }
}
