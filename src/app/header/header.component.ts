import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { IDummyJsonUser } from '../dummy-json-user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<IDummyJsonUser | null>;

  authService = inject(AuthService);

  constructor() {
    this.user$ = this.authService.user$;
  }

  signOut(): void {
    this.authService.logoutToDummyJson();
  }
}
