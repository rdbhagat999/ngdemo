import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { LoggerService } from '@app/_services/logger.service';

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

    const MAX_CACHE_TIME = 9_20_000;

    const currentTime = new Date().getTime();

    const cachedURLTime = this.cacheTime.get(request.url) || currentTime;

    const diffTime = currentTime - cachedURLTime;

    if (diffTime > MAX_CACHE_TIME) {
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
          if (response?.ok) {
            this.loggerService.log('Stored request.');
            if (this.cache.size > 20) {
              this.cache.clear();
              this.loggerService.log('Cleared all request cache.');
            }
            this.cache.set(request.url, response);
            this.cacheTime.set(request.url, new Date().getTime());
          }
        }
      })
    );
  }
}
