import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();
  private cacheTime = new Map<string, any>();

  private loggerService: LoggerService = inject(LoggerService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const currentTime = new Date().getTime();

    const cachedURLTime = this.cacheTime.get(request.url) || currentTime;

    const diffTime = currentTime - cachedURLTime;

    if (diffTime > 30_000) {
      this.cache.delete(request.url);
      this.loggerService.log('Request cache deleted.');
    }

    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse) {
      this.loggerService.log('Found request cache.');
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          this.loggerService.log('Stored request.');
          if (this.cache.size > 20) {
            this.cache.clear();
            this.loggerService.log('Cleared all request cache.');
          }
          this.cache.set(request.url, response);
          this.cacheTime.set(request.url, new Date().getTime());
        }
      })
    );
  }
}
