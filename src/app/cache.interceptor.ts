import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();
  private cacheTime = new Map<string, any>();

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

    if (diffTime > 1_20_000) {
      this.cache.delete(request.url);
      console.log('Request cache deleted.');
    }

    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse) {
      console.log('Found request cache.');
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          console.log('Stored request.');
          if (this.cache.size > 20) {
            this.cache.clear();
            console.log('Cleared all request cache.');
          } else {
            this.cache.set(request.url, response);
            this.cacheTime.set(request.url, new Date().getTime());
          }
        }
      })
    );
  }
}
