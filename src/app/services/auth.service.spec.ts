import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { MockAuthService, MockHttpClient, mockUser } from '../test_utils';
import { IDummyJsonUser } from '../dummy-json-user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`[loginToDummyJson] should set user with ID [${mockUser?.id}]`, (done) => {
    service.loginToDummyJson(mockUser?.username, '123').subscribe((user) => {
      expect(user?.username).toBe(mockUser?.username);

      done();
    });
  });

  it(`[logoutToDummyJson] should set user=null`, (done) => {
    service.logoutFromDummyJson();

    service.user$.subscribe((user) => {
      expect(user).toBe(null);

      done();
    });
  });
});
