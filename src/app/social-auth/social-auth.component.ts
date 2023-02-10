import { Component, inject, OnInit } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss'],
})
export class SocialAuthComponent implements OnInit {
  accessToken$: Observable<string>;
  user$: Observable<SocialUser | null>;
  loggedIn$: Observable<boolean>;

  authService = inject(AuthService);

  constructor() {
    this.accessToken$ = this.authService.accessToken$;
    this.loggedIn$ = this.authService.loggedIn$;
    this.user$ = this.authService.user$;
  }

  ngOnInit() {}

  signInWithFB(): void {
    this.authService.signInWithFB();
  }

  signOut(): void {
    this.authService.signOut();
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.authService.refreshToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
