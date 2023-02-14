import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { IDummyJsonUser } from '../dummy-json-user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService: CookieService = inject(CookieService);

  private readonly BASE_URL = 'https://dummyjson.com';

  private user = new BehaviorSubject<IDummyJsonUser | null>(null);
  user$ = this.user.asObservable();
  sub$!: Subscription;

  ngOnInit() {
    this.updateDummyJsonAuthStateFromLocalStorage();
  }

  getLocalStorageUser(): IDummyJsonUser | null {
    const data = window.localStorage.getItem('user');
    const user = data ? JSON.parse(data) : null;
    this.updateAuthUser(user);
    return user;
  }

  updateLocalStorageUser(user: any): void {
    const data = JSON.stringify(user);
    window.localStorage.setItem('user', data);
    this.cookieService.set('user', data, 1, '/', '', false);
    this.updateAuthUser(user);
  }

  deleteLocalStorageUser(): void {
    window.localStorage.removeItem('user');
    this.cookieService.delete('user');
    this.updateAuthUser(null);
  }

  updateAuthUser(user: any): void {
    this.user.next(user ? { ...user } : null);
  }

  updateDummyJsonAuthStateFromLocalStorage(): void {
    this.updateAuthUser(this.getLocalStorageUser());
  }

  onLoginUpdateDummyJsonUserState(user: any) {
    this.updateLocalStorageUser(user);
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
    this.deleteLocalStorageUser();
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
