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

  private readonly BASE_URL = 'https://dummyjson.com';

  private user = new BehaviorSubject<IDummyJsonUser | null>(null);
  user$ = this.user.asObservable();
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
    localStorage.setItem('user', JSON.stringify(user));
    this.updateAuthUser(user);
  }

  get AuthUserStatus() {
    return this.user.value;
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
    localStorage.removeItem('user');
    this.updateAuthUser(null);
    this.router.navigateByUrl('/home');
  }

  updateAuthUser(user: IDummyJsonUser | null): void {
    this.user.next(user);
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
