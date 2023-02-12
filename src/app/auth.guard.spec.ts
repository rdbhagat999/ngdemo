import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { MockHttpClient } from './test_utils';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: MockHttpClient }],
    });
    guard = TestBed.inject(AuthGuard);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
