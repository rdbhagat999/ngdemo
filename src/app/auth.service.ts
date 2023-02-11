import { HttpClient } from '@angular/common/http';

import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, defer, map, Subscription } from 'rxjs';
import { IDummyJsonUser } from './dummy-json-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  private BASE_URL = 'https://dummyjson.com';

  private accessToken = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<IDummyJsonUser | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);

  accessToken$ = this.accessToken.asObservable();
  user$ = this.user.asObservable();
  loggedIn$ = this.loggedIn.asObservable();

  sub$!: Subscription;

  ngOnInit() {
    this.updateDummyJsonAuthStateFromLocalStorage();
  }

  updateDummyJsonAuthStateFromLocalStorage(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.updateDummyJsonAuthState(JSON.parse(data));
    } else {
      this.updateDummyJsonAuthState(null);
    }
  }

  updateDummyJsonAuthState(user: IDummyJsonUser | null): void {
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

  logoutFromDummyJson() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.updateAccessToken('');
    this.updateAuthUser(null);
    this.updateAuthStatus(null);
    this.router.navigateByUrl('/home');
  }

  updateAuthUser(user: IDummyJsonUser | null): void {
    this.user.next(user);
  }

  updateAuthStatus(user: IDummyJsonUser | null): void {
    this.loggedIn.next(!!user);
  }

  updateAccessToken(token: string): void {
    this.accessToken.next(token);
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
