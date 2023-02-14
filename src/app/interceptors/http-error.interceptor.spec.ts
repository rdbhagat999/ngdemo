import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { MockHttpClient, MockAuthService } from '../test_utils';

describe('HttpErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: AuthService, useClass: MockAuthService },
        HttpErrorInterceptor,
      ],
    })
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor =
      TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
