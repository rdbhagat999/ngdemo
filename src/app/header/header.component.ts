import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<SocialUser | null>;

  authService = inject(AuthService);

  constructor() {
    this.user$ = this.authService.user$;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
