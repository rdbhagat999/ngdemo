import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { MockAuthService, MockHttpClient, mockUser } from '../test_utils';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let http: HttpClient;
  let service: AuthService;

  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/auth' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: routerMock },
      ],
    });
    http = TestBed.inject(HttpClient);
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false', fakeAsync(() => {
    service.updateDummyJsonAuthState(null);
    tick();
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth']);
  }));

  it('should return true', fakeAsync(() => {
    service.updateDummyJsonAuthState(mockUser);
    tick();
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    // expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  }));
});
