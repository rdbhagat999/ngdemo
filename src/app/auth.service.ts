import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, defer, map, Subscription } from 'rxjs';
import { IDummyJsonUser } from './dummy-json-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://dummyjson.com';
  private accessToken = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<IDummyJsonUser | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);

  accessToken$ = this.accessToken.asObservable();
  user$ = this.user.asObservable();
  loggedIn$ = this.loggedIn.asObservable();

  sub$!: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.updateDummyJsonAuthStateFromLocalStorage();
  }

  updateDummyJsonAuthStateFromLocalStorage() {
    const data = localStorage.getItem('user');
    if (data) {
      this.updateDummyJsonAuthState(JSON.parse(data));
    } else {
      this.updateDummyJsonAuthState(null);
    }
  }

  updateDummyJsonAuthState(user: IDummyJsonUser | null) {
    localStorage.setItem('token', user?.token || '');
    localStorage.setItem('user', JSON.stringify(user));
    this.updateAccessToken(user?.token || '');
    this.updateAuthUser(user);
    this.updateAuthStatus(user);
  }

  loginToDummyJson(username: string, password: string) {
    this.sub$ = this.http
      .post(
        `${this.BASE_URL}/auth/login`,
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe((data: any) => {
        this.updateDummyJsonAuthState(data as IDummyJsonUser);
        this.router.navigateByUrl('/products');
      });
  }

  logoutToDummyJson() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.updateAccessToken('');
    this.updateAuthUser(null);
    this.updateAuthStatus(null);
    this.router.navigateByUrl('/home');
  }

  updateAuthUser(user: IDummyJsonUser | null) {
    this.user.next(user);
  }

  updateAuthStatus(user: IDummyJsonUser | null) {
    this.loggedIn.next(!!user);
  }

  updateAccessToken(token: string) {
    this.accessToken.next(token);
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
