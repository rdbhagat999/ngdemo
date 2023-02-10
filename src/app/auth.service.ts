import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, defer, map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://dummyjson.com';
  private accessToken = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<SocialUser | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  private authService = inject(SocialAuthService);

  private sub$: Subscription;

  user$ = this.user.asObservable();
  loggedIn$ = this.loggedIn.asObservable();
  accessToken$ = this.accessToken.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.sub$ = this.authService.authState.subscribe((user) => {
      this.updateAuthUser(user);
      this.updateAuthStatus(user);
    });
  }

  loginToDummyJson(username: string, password: string) {
    this.http
      .post(
        `${this.BASE_URL}/auth/login`,
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(map((data: any) => data?.token))
      .subscribe((token) => {
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/products');
      });
  }

  updateAuthUser(user: SocialUser | null) {
    this.user.next(user);
  }

  updateAuthStatus(user: SocialUser | null) {
    this.loggedIn.next(user != null);
  }

  updateAccessToken(token: string) {
    this.accessToken.next(token);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getAccessToken(providerId: string): void {
    this.authService
      .getAccessToken(providerId)
      .then((accessToken) => this.updateAccessToken(accessToken));
  }

  refreshToken(providerId: string): void {
    this.authService.refreshAuthToken(providerId);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
