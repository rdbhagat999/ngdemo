import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { IDummyJsonUser } from '../dummy-json-user.interface';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from './session-storage.service';

const COOKIE_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService: CookieService = inject(CookieService);
  private sessionService: SessionStorageService = inject(SessionStorageService);

  private readonly BASE_URL = 'https://dummyjson.com';

  private user = new BehaviorSubject<IDummyJsonUser | null>(null);
  user$ = this.user.asObservable();
  sub$!: Subscription;

  ngOnInit() {
    this.updateDummyJsonAuthStateFromSessionStorage();
  }

  getSessionStorageUser(): IDummyJsonUser | null {
    const user = this.sessionService.getUser();
    this.updateAuthUser(user);
    return user;
  }

  updateSessionStorageUser(user: any): void {
    this.sessionService.saveUser(user);
    this.cookieService.set(COOKIE_KEY, user?.token, 1, '/', '', true);
    this.updateAuthUser(user);
  }

  deleteSessionStorageUser(): void {
    this.sessionService.clean();
    this.cookieService.delete(COOKIE_KEY);
    this.updateAuthUser(null);
  }

  updateAuthUser(user: any): void {
    this.user.next(user ? { ...user } : null);
  }

  updateDummyJsonAuthStateFromSessionStorage(): void {
    this.updateAuthUser(this.sessionService.getUser());
  }

  async onLoginUpdateDummyJsonUserState(user: any) {
    this.updateSessionStorageUser(user);
  }

  loginToDummyJson(username: string, password: string) {
    return this.http.post<IDummyJsonUser>(
      `${this.BASE_URL}/auth/login`,
      { username, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  checkUsername(username: string) {
    if (username === 'kminchelle') {
      return of(true);
    }
    return of(false);
  }

  logoutFromDummyJson() {
    this.deleteSessionStorageUser();
    this.router.navigateByUrl('/home');
  }

  isTokenExpired(token: string) {
    try {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return expiry * 1000 > Date.now();
    } catch (error) {
      return true;
    }
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
