import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { IDummyJsonUser } from './dummy-json-user.interface';

const mockUser = {
  email: 'mockuser@email',
  firstName: 'mockuser_firstname',
  gender: 'mockuser_gender',
  id: 6,
  image: 'mockuser_image',
  lastName: 'mockuser_lastname',
  token: 'mockuser_token',
  username: 'mockuser_username',
};

class MockHttpClient {}

@Injectable()
class MockAuthService extends AuthService {
  override updateDummyJsonAuthState(user: IDummyJsonUser | null) {
    this.updateAccessToken(user?.token || '');
    this.updateAuthUser(user);
    this.updateAuthStatus(user);
  }

  override loginToDummyJson(username: string, password: string) {
    this.updateDummyJsonAuthState(mockUser as IDummyJsonUser);
  }

  override logoutFromDummyJson() {
    this.updateAccessToken('');
    this.updateAuthUser(null);
    this.updateAuthStatus(null);
  }
}

fdescribe('AuthService', () => {
  let service: MockAuthService;
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

  it(`[loginToDummyJson] should set user`, (done) => {
    service.loginToDummyJson(mockUser?.username, '123');

    service.user$.subscribe((user) => {
      expect(user?.username).toBe(mockUser?.username);

      done();
    });
  });

  it(`[userId] should be [${mockUser?.id}]`, (done) => {
    service.loginToDummyJson(mockUser?.username, '123');

    service.user$.subscribe((user) => {
      expect(user?.id).toBe(mockUser?.id);

      done();
    });
  });

  it(`[user] should be [null]`, (done) => {
    service.user$.subscribe((user) => {
      expect(user).toBe(null);

      done();
    });
  });

  it('[loggedIn] should to be [true]', (done) => {
    service.loginToDummyJson(mockUser?.username, '123');

    service.loggedIn$.subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBe(true);

      done();
    });
  });

  it('[loggedIn] should to be [false]', (done) => {
    service.loggedIn$.subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBe(false);

      done();
    });
  });

  it(`[authToken] should be [${mockUser?.token}]`, (done) => {
    service.loginToDummyJson(mockUser?.username, '123');

    service.accessToken$.subscribe((token) => {
      expect(token).toBe(mockUser.token);

      done();
    });
  });

  it(`[authToken] should be ['']`, (done) => {
    service.accessToken$.subscribe((token) => {
      expect(token).toBe('');

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
